<template>
	<GameFree v-if="modes.free" />
</template>

<script>
import { mapState } from "pinia";
import { useGameStore } from "@/stores/gameStore";
import GameFree from "@/components/GameFree.vue";

export default {
	components: { GameFree },
	computed: {
		...mapState(useGameStore, [
			"modes",
		]),
	},
};
</script>