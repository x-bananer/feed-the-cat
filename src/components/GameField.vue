<template>
	<div class="game" @click="fly">
		<GameBird />
		<GamePipe
			v-for="(pipe, index) in pipes"
			:key="index"
			:x="pipe.x"
			:y="pipe.y"
			:height="pipe.height"
		/>
		<GameReward
			v-for="(reward, index) in rewards"
			:key="index"
			:x="reward.x"
			:y="reward.y"
		/>
		<div class="score">Score: {{ score }}</div>
		<div v-if="isGameOver" class="game-over">
			Game Over
			<button @click="startGame">Start</button>
		</div>
		<div v-if="isLevelComplete" class="level-complete">
			<p>Поздравляем!</p>
			<button @click="startNextLevel">
				{{ level === 3 ? "Ты победил!" : "На следующий уровень" }}
			</button>
		</div>
	</div>
</template>

<script>
import { useGameStore } from "@/stores/gameStore";
import GameBird from "./GameBird.vue";
import GamePipe from "./GamePipe.vue";
import GameReward from "./GameReward.vue";
import { mapState } from "pinia";

export default {
	components: { GameBird, GamePipe, GameReward },
	computed: {
		...mapState(useGameStore, [
			"pipes",
			"rewards",
			"score",
			"isGameOver",
			"isGameRunning",
			"isLevelComplete",
			"level",
		]),
	},
	methods: {
		fly() {
			const gameStore = useGameStore();
			if (!this.isGameOver && !this.isLevelComplete) {
				gameStore.fly();
			}
		},
		startGame() {
			const gameStore = useGameStore();
			gameStore.resetGame();
			this.isLevelComplete = false; // сброс состояния завершения уровня
			this.gameInterval = setInterval(() => {
				gameStore.fall();
			}, 20);
		},
		startNextLevel() {
			this.startGame();
		},
	},
	mounted() {
		this.startGame();
	},
	beforeUnmount() {
		clearInterval(this.gameInterval);
	},
	watch: {
		isGameOver(newVal) {
			if (newVal) {
				clearInterval(this.gameInterval);
			}
		},
		isGameRunning(newVal) {
			if (!newVal) {
				clearInterval(this.gameInterval);
			}
		},
	},
};
</script>

<style scoped>
.game {
	width: 100%;
	height: 100vh;
	background-color: skyblue;
	overflow: hidden;
	position: relative;
}
.score {
	position: absolute;
	top: 10px;
	left: 10px;
	font-size: 24px;
	color: white;
}
.game-over,
.level-complete {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 48px;
	color: red;
}
</style>
