<template>
	<div class="page-loading" v-show="loading">
		<span class="loader"></span>
	</div>
	<div class="page" v-show="!loading">
		<div class="page__container">
			<div class="page__logo">
				<img class="image page__logo-img" src="../assets/logo-2.png" alt="Корми котов">
			</div>

			<img class="image page__img-1" src="../assets/food/Food-1.png">
			<img class="image page__img-2" src="../assets/food/Food-2.png">
			<img class="image page__img-3" src="../assets/food/Food-3.png">
			<img class="image page__img-4" src="../assets/characters/hero-2.png">

			<div class="page__button">
				<div class=" button green" @click="onClickStart">Кормить котов</div>
				<div class=" button blue" @click="onClickToRules">Правила игры</div>
			</div>
			
			
		</div>
	</div>
</template>

<script>
import { useGameStore } from "@/stores/gameStore";
import { mapState } from "pinia";

export default {
	data() {
		return {
			imagesLoaded: 0,
			totalImages: 5,
			loading: true,
		};
	},
	computed: {
		...mapState(useGameStore, [
			"isSoundOn",
		]),
	},	
	methods: {
		onClickStart() {
			if (this.isSoundOn) {
				const src = require("../assets/audio/meow.wav");
				const audio = new Audio(src);
				audio.play().catch((error) => {
					console.error("Error playing sound:", error);
				});
			}
			
			const gameStore = useGameStore();
			gameStore.setScreen("city");
		},
		onClickToRules() {
			const gameStore = useGameStore();
			gameStore.setScreen("rules");
		},	
		imageLoaded() {
			this.imagesLoaded += 1;
			if (this.imagesLoaded >= this.totalImages) {
				setTimeout(() => {
					this.loading = false;
				}, 1000);
			}
		},
		checkImages() {
			const images = document.querySelectorAll(".image");
			images.forEach((img) => {
				if (img.complete) {
					this.imageLoaded();
				} else {
					img.addEventListener("load", this.imageLoaded);
					img.addEventListener("error", this.imageLoaded);
				}
			});
		},
	},
	mounted() {
		this.checkImages();
	},
	beforeUnmount() {
		const images = document.querySelectorAll(".image");
		images.forEach((img) => {
			img.removeEventListener("load", this.imageLoaded);
			img.removeEventListener("error", this.imageLoaded);
		});
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
	background-image: url('../assets/start.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.page-loading {
	width: 100%;
	height: calc(var(--vh, 1vh) * 100);
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
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
	text-transform: uppercase;
	background: rgba(240, 192, 64, 0.8);
	position: relative;
	text-align: center;
	color: #FFF;

	border: 4px solid #c09933;
	box-shadow: 4px 4px #997a29;
}

.page__logo {
	width: 50px;
	position: relative;
	right: -100px;
	margin-top: -120px;
}

.page__logo-img {
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 15;
}

.page__button {
	position: relative;
	z-index: 10;
	margin-top: -10px;
}

.page__img-1 {
	position: absolute;
	width: 40px;
	bottom: 0;
	right: 0;
	display: none;
}

.page__img-2 {
	position: absolute;
    width: 30px;
    bottom: -4px;
    right: 24px;
	display: none;
}

.page__img-3 {
    position: absolute;
    top: 56px;
    left: 56px;
    width: 20px;
	display: none;
}

.page__img-4 {
	position: absolute;
    top: 8px;
    width: 50px;
    left: 8px;
	display: none;
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
