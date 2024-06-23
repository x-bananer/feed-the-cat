<template>
	<div id="app">
		<!-- <GameField  /> -->
		<GameCity v-if="mode === 'feedCats'" />
		<GameStart @chooseMode="onChooseMode" />

	</div>
</template>

<script>
// import GameField from "./components/GameField.vue";
import GameStart from "./components/GameStart.vue";
import GameCity from "./components/GameCity.vue";

export default {
	name: "App",
	components: {
		// GameField,
		GameStart,
		GameCity,
	},
	data() {
		return {
			mode: '',
		}
	},
	methods: {
		onChooseMode(mode) {
			this.mode = mode;
		}
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	overflow: hidden; /* Удаление скроллинга */
}
</style>
