<template>
	<div id="app">
        <template v-if="screens.start">
            <GameStart />
        </template>
        <template v-if="screens.city">
            <GameCity />
        </template>
        <template v-if="screens.game">
            <GameField />
        </template>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useGameStore } from "@/stores/gameStore";
import GameField from "@/components/GameField.vue";
import GameStart from "@/components/GameStart.vue";
import GameCity from "@/components/GameCity.vue";

export default {
	name: "App",
	components: {
		GameField,
		GameStart,
		GameCity,
	},
	computed: {
		...mapState(useGameStore, [
            "screens",
		]),
	},	
	methods: {},
};
</script>