/* eslint-disable */
<template>
	<div
		class="page"
		@mousedown="handleInteraction"
		@touchstart="handleInteraction"
		@touchmove.prevent
		@touchend.prevent
	>
		<div v-if="!isGameRunning && !isGameOver" class="page__outline"></div>
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
		<div v-if="!isGameRunning && !isGameOver" class="page__reminder">
			<img class="page__reminder-img" src="../assets/rule.png" alt="" />
		</div>
		<div v-if="!isFinalNotice" class="page__caption">
			Собрано: {{ score }}
		</div>
		<div v-if="isFinalNotice" class="notice">
			<div class="notice__container">
				<p class="notice__title">
					{{ score ? finalMessage.title : "Коту под хвост" }}
				</p>
				<p class="notice__description" v-if="score">
					{{ finalMessage.description }}
				</p>
				<p
					v-else
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
// Copyright © Kseniia Shlenskaia, 2024. All rights reserved.

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
		};
	},
	computed: {
		finalMessages() {
			return [
				{
					title: "Только у кошек девять жизней",
					description: `Ваш парашют не раскрылся, и вы упали на старушку. Хорошая новость – неравнодушные прохожие отдали собранную еду ${
						this.score
					} ${this.declOfNum(this.score, [
						"коту",
						"котам",
						"котам",
					])}. Плохая – у старушки не было завещания.`,
				},
				{
					title: "Путь к сердцу кота лежит через желудок",
					description: `Вам удалось перезапустить реактивный ранец у самой земли и успешно сесть. Результат: ${this.declOfNum(
						this.score,
						["накормлен", "накормлены", "накормлено"]
					)} ${this.score} ${this.declOfNum(this.score, [
						"кот",
						"кота",
						"котов",
					])}`,
				},
				{
					title: "Держись, котик, я иду",
					description: `Падая, вы успели заметить кота на крыше и бросили ему корм. ${this.declOfNum(
						this.score - 1,
						["Оставшийся", "Оставшиеся", "Оставшиеся"]
					)} ${this.score - 1} ${this.declOfNum(this.score - 1, [
						"припас",
						"припаса",
						"припасов",
					])} ${this.declOfNum(this.score - 1, [
						"канул",
						"канули",
						"канули",
					])} в Лету вместе с вами. К сожалению, вы не умели плавать. `,
				},
				{
					title: "Я кота (не) накормлю",
					description: `Приземлившись на городскую площадь, вы были атакованы всеядными голубями. Ну а что, ${
						this.score
					} ${this.declOfNum(this.score, [
						"сытая птица",
						"сытые птицы",
						"сытых птиц",
					])} – тоже рекорд. `,
				},
				{
					title: "Котопокалипсис сегодня",
					description: `Шутка! Не случилось ровным счётом ничего плохого. Вы удачно приземляетесь и получаете ${
						this.score
					} «мяу» от ${this.score} ${this.declOfNum(this.score, [
						"сытого кота",
						"сытых котов",
						"сытых котов",
					])}.`,
				},
				{
					title: "В кототерии что-то перепутали",
					description: `Кое-как добравшись до земли, вы были рады выставить ${
						this.score
					} ${this.declOfNum(this.score, [
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
						this.score
					} ${this.declOfNum(this.score, [
						"пушистик",
						"пушистика",
						"пушистиков",
					])} – и ${
						this.score > 1 ? "каждый" : ""
					} получает своё угощение. «Мур» еще никогда не был таким приятным.`,
				},
			];
		},
		finalMessage() {
			return this.finalMessages[
				Math.floor(Math.random() * this.finalMessages.length)
			];
		},
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
				Kair: require("@/assets/backgounds/Kair.png"),
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
	height: calc(var(--vh, 1vh) * 100);
	overflow: hidden;
	position: relative;
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
</style>
