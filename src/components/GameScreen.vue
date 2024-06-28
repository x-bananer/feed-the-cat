<template>
	<div id="app">
		<div class="app__icon" @click="onClickSoundState">
			<img v-if="isSoundOn" class="app__icon-img" src="../assets/unmute.svg">
			<img v-else class="app__icon-img" src="../assets/mute.svg">
		</div>
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
			"isSoundOn",
		]),
	},	
	methods: {
		onClickSoundState() {
			const gameStore = useGameStore();
			gameStore.setSoundState(!this.isSoundOn);
		},
	},
};
</script>

<style scoped>
.app {
	position: relative;
}

.app__icon {
    position: absolute;
    width: 40px;
    height: 40px;
    filter: contrast(var(--background-contrast, 1)) opacity(var(--background-opacity, 1));
    z-index: 100;
    top: 8px;
    right: 8px;
	opacity: 0.8;
}

.app__icon-img {
	width: 100%;
	height: 100%;
}

</style>