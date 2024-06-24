<template>
	<div
		class="page"
		@mousedown="handleInteraction"
		@touchstart="handleInteraction"
		@touchmove.prevent
		@touchend.prevent
	>
		<div class="page__background" :style="backgroundStyle"></div>
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
		<div class="page__caption">Собрано: {{ score }}</div>
		<div v-if="isGameOver" class="game-over">
			<p style="margin-bottom: 10px">Только у кошек девять жизней</p>
			<p v-if="score" style="margin-bottom: 16px; font-size: 16px; margin: auto">
				Вы накормили
				<br> {{ score }} {{ declOfNum(score, ['кота', 'котов', 'котов'])  }}
			</p>
			<p v-else style="margin-bottom: 16px; font-size: 16px;  margin: auto">
				Вы упали :(
			</p>
			<div
				class="button yellow"
				@mousedown="startGame"
				@touchstart="startGame"
			>
				Ещё раз
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useGameStore } from "@/stores/gameStore";
import GameBird from "@/components/GameBird.vue";
import GamePipe from "@/components/GamePipe.vue";
import GameReward from "@/components/GameReward.vue";

export default {
	components: { GameBird, GamePipe, GameReward },
	data() {
		return {
			backgroundOpacity: 1,
			backgroundContrast: 0.7,
			touchStartTime: null,
			lastInteractionTime: 0,
			interactionDelay: 100,
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
			"currentCityName",
		]),
		backgroundImages() {
			return {
				Moscow: require("@/assets/backgounds/Moscow.png"),
				Kair: require("@/assets/backgounds/Kair.png"),
				Istanbul: require("@/assets/backgounds/Istanbul.png"),
				Minsk: require("@/assets/backgounds/Minsk.png"),
			};
		},
		backgroundStyle() {
			const imageUrl =
				this.backgroundImages[this.currentCityName] ||
				this.backgroundImages.Moscow;
			return {
				"--background-opacity": this.backgroundOpacity,
				"--background-contrast": this.backgroundContrast,
				"background-image": `url(${imageUrl})`,
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
		declOfNum(n, titles) { return titles[ n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2 ]; },
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
.page {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative;
}

.page__background {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	/* background-image: url("/src/assets/backgounds/${currentCityName}.png"); */
	background-size: cover;
	background-position: center;
	filter: contrast(var(--background-contrast, 1))
		opacity(var(--background-opacity, 1));
	z-index: -1;
}

.page__caption {
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
	font-size: 24px;
	background: rgba(96, 128, 192, 0.8);
	/* border-radius: 8px; */
	padding: 24px 16px;
	width: calc(100vw - 40px);
	border: 4px solid rgb(77, 102, 153);
	box-shadow: 4px 4px rgb(61, 82, 123);
	height: calc(100vh - 200px);
	margin: auto;
}
</style>
