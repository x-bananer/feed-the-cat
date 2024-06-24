<template>
	<GameStory v-if="modes.story" />
	<GameFree v-if="modes.free" />
</template>

<script>
import { mapState } from "pinia";
import { useGameStore } from "@/stores/gameStore";
import GameStory from "@/components/GameStory.vue";
import GameFree from "@/components/GameFree.vue";

export default {
	components: { GameStory, GameFree },
	computed: {
		...mapState(useGameStore, [
			"modes",
		]),
	},
};
</script>