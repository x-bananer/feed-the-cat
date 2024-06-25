<template>
	<div class="page">
		<div class="page__container">
			<p class="page__text page__text-lined">Летай</p>
			<p class="page__text page__text-lined">Корми котов</p>
			<p class="page__text">Получай «мур»</p>
			<div class="page__button button green" @click="onClickStart">Кормить котов</div>
			<div class="page__logo">
				<img class="page__logo-img" src="../assets/logo.png" alt="Корми котов">
			</div>
		</div>
	</div>
</template>

<script>
import { useGameStore } from "@/stores/gameStore";

export default {
	data() {
		return {};
	},
	computed: {},
	methods: {
		onClickStart() {
			const src = require("../assets/audio/meow.wav");
			const audio = new Audio(src);
			audio.play().catch((error) => {
				console.error("Error playing sound:", error);
			});

			const gameStore = useGameStore();
			gameStore.setScreen("city");
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
	padding: 20px;
	background: #f0c040;
}
.page__container {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	height: 100%;
	flex-direction: column;
	padding: 24px 16px;
	border: 3px solid #FFF;
	border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
	text-transform: uppercase;
	background: #6080c0;
	position: relative;
	text-align: center;
	color: #FFF;
}

.page__container::before {
	content: "";
	border: 2px solid #353535;
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
	border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
}

.page__logo {
	padding: 20px 0;
	height: 230px;
	width: 224px;
}

.page__logo-img {
	width: 100%;
	height: 100%;
}

.page__button {
	position: relative;
	z-index: 10;
	margin-top: 60px;
	margin: auto;
}

.page__text {
	font-size: 22px;
	display: block;
	position: relative;
}

.page__text-lined:after {
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    bottom: -12px;
    left: 0;
    background: #FFF;
}

.page__text + .page__text {
	margin-top: 24px;
}
</style>
