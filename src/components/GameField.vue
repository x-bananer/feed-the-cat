<template>
	<div
		class="game"
		@mousedown="handleInteraction"
		@touchstart="handleInteraction"
		@touchmove.prevent
		@touchend.prevent
	>

	<!-- <div class="button play">PLAY</div>
    <div class="button pause">PAUSE</div>
    <div class="button loser">LOSER</div>
    <div class="button done">DONE</div> -->

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
		<div class="score">Собрано: {{ score }}</div>
		<div v-if="isGameOver" class="game-over">
			<p style="margin-bottom: 10px">
				Вы упали
			</p>
			<p style="margin-bottom: 16px; font-size: 16px;">
				Только у кошек девять жизней
			</p>
			<div class="button play" @mousedown="startGame" @touchstart="startGame">Ещё раз</div>
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
			if (
				currentTime - this.lastInteractionTime <
				this.interactionDelay
			) {
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
			const gameStore = useGameStore();
			gameStore.setPipeWidth();
			gameStore.startGame();
		},
		startNextLevel() {
			this.startGame();
		},
	},
	mounted() {
		this.startGame();
	},
	beforeUnmount() {
		const gameStore = useGameStore();
		clearInterval(gameStore.gameInterval);
	},
	watch: {
		isGameOver(newVal) {
			const gameStore = useGameStore();
			if (newVal) {
				clearInterval(gameStore.gameInterval);
			}
		},
		isGameRunning(newVal) {
			const gameStore = useGameStore();
			if (!newVal) {
				clearInterval(gameStore.gameInterval);
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
	image-rendering: pixelated;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-image: url("/src/assets/backgounds/Moscow.png");
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

.game-over {
	display: flex;
	align-content: center;
	justify-content: center;
	text-align: center;
	color: #ffffff;
	flex-direction: column;
	font-size: 32px;
	background: rgba(96, 128, 192, 0.8);
	/* border-radius: 8px; */
	padding: 24px 16px;
	width: calc(100vw - 40px);
	border: 4px solid rgb(77, 102, 153);
	box-shadow: 4px 4px rgb(61, 82, 123);
}
</style>
