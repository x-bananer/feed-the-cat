<template>
	<div class="game" @click="fly">
		<div class="background-image" :style="backgroundStyle"></div>
		<!-- Фон с фильтрами -->
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
	data() {
		return {
			backgroundOpacity: 1, // Начальная прозрачность фона
			backgroundContrast: 0.6, // Начальная контрастность фона
		};
	},
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
		backgroundStyle() {
			return {
				"--background-opacity": this.backgroundOpacity,
				"--background-contrast": this.backgroundContrast,
			};
		},
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
	overflow: hidden;
	position: relative;
}

.background-image {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("/src/assets/backgounds/Moscow.png"); /* Укажите путь к вашему изображению */
	background-size: cover; /* Обеспечивает покрытие всего экрана */
	background-position: center; /* Центрирует изображение */
	filter: contrast(var(--background-contrast, 1))
		opacity(var(--background-opacity, 1)); /* Устанавливаем фильтры через переменные */
	z-index: -1; /* Размещаем изображение под остальными элементами */
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
