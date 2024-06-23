<template>
	<div
		class="game"
		@mousedown="handleInteraction"
		@touchstart="handleInteraction"
		@touchmove.prevent
		@touchend.prevent
	>
		<div class="background-image" :style="backgroundStyle"></div>
		<GameBird />
		<GamePipe
			v-for="(pipe, index) in pipes"
			:key="index"
			:x="pipe.x"
			:y="pipe.y"
			:height="pipe.height"
		/>
		<GameReward
			v-for="reward in rewards"
			:key="reward.id"
			:x="reward.x"
			:y="reward.y"
		/>
		<div class="score">Score: {{ score }}</div>
		<div v-if="isGameOver" class="game-over">
			Game Over
			<button @mousedown="startGame" @touchstart="startGame">Start</button>
		</div>
		<div v-if="isLevelComplete" class="level-complete">
			<p>Поздравляем!</p>
			<button @mousedown="startNextLevel" @touchstart="startNextLevel">
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
			backgroundOpacity: 1,
			backgroundContrast: 0.6,
			touchStartTime: null,
			lastInteractionTime: 0,
			interactionDelay: 100, // Задержка между взаимодействиями
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
		handleInteraction(event) {
			event.preventDefault();

			const currentTime = Date.now();
			if (currentTime - this.lastInteractionTime < this.interactionDelay) {
				return;
			}

			this.lastInteractionTime = currentTime;
			this.fly();
		},
		fly() {
			const gameStore = useGameStore();
			if (!this.isGameOver && !this.isLevelComplete) {
				gameStore.fly();
			}
		},
		startGame() {
			if (this.gameInterval) {
				console.log('interval')
				clearInterval(this.gameInterval); // Очищаем предыдущий интервал
			}
			const gameStore = useGameStore();
			gameStore.setPipeWidth();
			gameStore.resetGame();
			this.isLevelComplete = false;
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
				console.log('clearInterval')
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
	background-size: cover;
	background-position: center;
	filter: contrast(var(--background-contrast, 1))
		opacity(var(--background-opacity, 1));
	z-index: -1;
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
