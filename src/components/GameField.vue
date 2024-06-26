/* eslint-disable */
<template>
	<div class="page page--loader" v-show="loading">
		<span class="loader"></span>
	</div>
	<div
		v-show="!loading"
		class="page"
		@mousedown="handleInteraction"
		@touchstart="handleInteraction"
		@touchmove.prevent
		@touchend.prevent
	>
		<div v-show="!isGameRunning && !isGameOver" class="page__outline"></div>
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
		<div v-show="!isGameRunning && !isGameOver" class="page__reminder">
			<img class="page__reminder-img" src="../assets/rule.png" alt="" />
		</div>
		<div v-show="!isFinalNotice" class="page__caption">
			Собрано: {{ score }}
		</div>
		<div v-show="isFinalNotice" class="notice">
			<div class="notice__container">
				<p class="notice__title" v-if="finalMessage">
					{{ score ? finalMessage.title : "Коту под хвост" }}
				</p>
				<p class="notice__description" v-if="finalMessage" v-show="score">
					{{ finalMessage.description }}
				</p>
				<p
					v-show="!score"
					class="notice__description"
					style="text-align: center"
				>
					Вы не успели ничего собрать. <br /><br />
					Не страшно! Попробуйте ещё раз
				</p>
				<div
					class="button yellow"
					@mousedown="startGame"
					@touchstart="startGame"
				>
					Ещё раз
				</div>
				<div
					class="button red"
					@mousedown="onClickToMenu"
					@touchstart="onClickToMenu"
				>
					Уйти
				</div>
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
			backgroundContrast: 0.8,
			touchStartTime: null,
			lastInteractionTime: 0,
			interactionDelay: 100,
			loading: true,
			finalMessage: null,
		};
	},
	computed: {
		...mapState(useGameStore, [
			"pipes",
			"rewards",
			"score",
			"isGameOver",
			"isGameRunning",
			"level",
			"currentCityName",
			"isFinalNotice",
		]),
		backgroundImages() {
			return {
				Moscow: require("@/assets/backgounds/Moscow.png"),
				Istanbul: require("@/assets/backgounds/Istanbul.png"),
				Minsk: require("@/assets/backgounds/Minsk.png"),
			};
		},
		backgroundStyle() {
			if (!this.currentCityName) {
				return {
					background: "#f0c040",
				};
			} else {
				const imageUrl =
					this.backgroundImages[this.currentCityName] ||
					this.backgroundImages.Moscow;
				return {
					"--background-opacity": this.backgroundOpacity,
					"--background-contrast": this.backgroundContrast,
					"background-image": `url(${imageUrl})`,
				};
			}
		},
	},
	methods: {
		setFinalMessage() {
			const finalMessages = this.setFinalMessages(this.score);

			this.finalMessage = finalMessages[
				Math.floor(Math.random() * finalMessages.length)
			];
		},	
		setFinalMessages(score) {
			return [
				{
					title: "Только у кошек девять жизней",
					description: `Ваш парашют не раскрылся, и вы упали на старушку. Хорошая новость – неравнодушные прохожие отдали собранную еду ${
						score
					} ${this.declOfNum(score, [
						"коту",
						"котам",
						"котам",
					])}. Плохая – у старушки не было завещания.`,
				},
				{
					title: "Путь к сердцу кота лежит через желудок",
					description: `Вам удалось перезапустить реактивный ранец у самой земли и успешно сесть. Результат: ${this.declOfNum(
						score,
						["накормлен", "накормлены", "накормлено"]
					)} ${score} ${this.declOfNum(score, [
						"кот",
						"кота",
						"котов",
					])}`,
				},
				{
					title: "Держись, котик, я иду",
					description: `Падая, вы успели заметить кота на крыше и бросили ему корм. ${this.declOfNum(
						score - 1,
						["Оставшийся", "Оставшиеся", "Оставшиеся"]
					)} ${score - 1} ${this.declOfNum(score - 1, [
						"припас",
						"припаса",
						"припасов",
					])} ${this.declOfNum(score - 1, [
						"канул",
						"канули",
						"канули",
					])} в Лету вместе с вами. К сожалению, вы не умели плавать. `,
				},
				{
					title: "Я кота (не) накормлю",
					description: `Приземлившись на городскую площадь, вы были атакованы всеядными голубями. Ну а что, ${
						score
					} ${this.declOfNum(score, [
						"сытая птица",
						"сытые птицы",
						"сытых птиц",
					])} – тоже рекорд. `,
				},
				{
					title: "Котопокалипсис сегодня",
					description: `Шутка! Не случилось ровным счётом ничего плохого. Вы удачно приземляетесь и получаете ${
						score
					} «мяу» от ${score} ${this.declOfNum(score, [
						"сытого кота",
						"сытых котов",
						"сытых котов",
					])}.`,
				},
				{
					title: "В кототерии что-то перепутали",
					description: `Кое-как добравшись до земли, вы были рады выставить ${
						score
					} ${this.declOfNum(score, [
						"полную миску",
						"полных миски",
						"полных мисок",
					])} отборного корма перед довольными котами. Правда, надев очки, вы поняли, что кормите опоссумов. `,
				},
				{
					title: "Поймай, если сможешь",
					description: `Из-за неисправного ранца вы крутились в воздухе так, что собранный корм разлетелся по всему городу. Интересно, достанется ли он котам? Количество накормленных: неизвестно.`,
				},
				{
					title: "Ты не пройдешь",
					description: `…мимо голодного кота. На земле вас встречает ${
						score
					} ${this.declOfNum(score, [
						"пушистик",
						"пушистика",
						"пушистиков",
					])} – и ${
						score > 1 ? "каждый" : ""
					} получает своё угощение. «Мур» еще никогда не был таким приятным.`,
				},
			];
		},
		handleInteraction(event) {
			if (this.isGameOver) return;

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
			if (!this.isGameOver) {
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
		declOfNum(n, titles) {
			return titles[
				n % 10 === 1 && n % 100 !== 11
					? 0
					: n % 10 >= 2 &&
					  n % 10 <= 4 &&
					  (n % 100 < 10 || n % 100 >= 20)
					? 1
					: 2
			];
		},
		onClickToMenu() {
			const gameStore = useGameStore();
			gameStore.resetState();
		},
	},
	mounted() {
		this.startGame();

		setTimeout(() => {
			this.loading = false;
		}, 500);
	},
	beforeUnmount() {
		const gameStore = useGameStore();
		clearInterval(gameStore.gameInterval);
	},
	watch: {
		isGameOver(newVal) {
			this.setFinalMessage();

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
	height: calc(var(--vh, 1vh) * 100);
	overflow: hidden;
	position: relative;
}

.page--loader {
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f0c040;
}

.page__background {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
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

.notice {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: scroll;
	background: rgba(96, 128, 192, 0.8);
	border: 4px solid rgb(77, 102, 153);
	box-shadow: 4px 4px rgb(61, 82, 123);
	width: calc(100vw - 40px);
	max-height: calc(var(--vh, 1vh) * 100 - 50px);
	margin: auto;
}

.notice__container {
	position: relative;
	display: flex;
	align-content: center;
	justify-content: center;
	flex-direction: column;
	color: #ffffff;
	padding: 24px 16px;
}

.notice__title {
	font-size: 22px;
	text-align: center;
}

.notice__description {
	font-size: 20px;
	margin-bottom: auto;
	padding: 32px 0 30px;
	font-family: "Montserrat Alternates", monospace;
	font-weight: 400;
}

.page__outline {
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: #333;
	opacity: 0.4;
}

.page__reminder {
	position: absolute;
	bottom: 134px;
	z-index: 1;
	left: 34px;
}

.page__reminder-img {
	width: 200px;
	height: auto;
}

.loader {
	position: relative;
	width: 164px;
	height: 164px;
}
.loader::before,
.loader::after {
	content: "";
	position: absolute;
	width: 40px;
	height: 40px;
	background-color: #fff;
	left: 50%;
	top: 50%;
	animation: rotate 1s ease-in infinite;
}
.loader::after {
	width: 20px;
	height: 20px;
	background-color: #6080c0;
	animation: rotate 1s ease-in infinite, moveY 1s ease-in infinite;
}

@keyframes moveY {
	0%,
	100% {
		top: 10%;
	}
	45%,
	55% {
		top: 59%;
	}
	60% {
		top: 40%;
	}
}
@keyframes rotate {
	0% {
		transform: translate(-50%, -100%) rotate(0deg) scale(1, 1);
	}
	25% {
		transform: translate(-50%, 0%) rotate(180deg) scale(1, 1);
	}
	45%,
	55% {
		transform: translate(-50%, 100%) rotate(180deg) scale(3, 0.5);
	}
	60% {
		transform: translate(-50%, 100%) rotate(180deg) scale(1, 1);
	}
	75% {
		transform: translate(-50%, 0%) rotate(270deg) scale(1, 1);
	}
	100% {
		transform: translate(-50%, -100%) rotate(360deg) scale(1, 1);
	}
}
</style>
