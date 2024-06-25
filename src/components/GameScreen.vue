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
		<template v-if="screens.rules">
            <GameRules />
        </template>
	</div>
</template>

<script>
// Copyright © Kseniia Shlenskaia, 2024. All rights reserved.

import { mapState } from "pinia";
import { useGameStore } from "@/stores/gameStore";
import GameField from "@/components/GameField.vue";
import GameStart from "@/components/GameStart.vue";
import GameCity from "@/components/GameCity.vue";
import GameRules from "@/components/GameRules.vue";

export default {
	name: "App",
	components: {
		GameField,
		GameStart,
		GameCity,
		GameRules,
	},
	computed: {
		...mapState(useGameStore, [
            "screens",
		]),
	},	
	methods: {},
};
</script>