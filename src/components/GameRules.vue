<template>
	<div class="page">
		<div class="page__container page__container--loading" v-show="loading">
			<span class="loader"></span>
		</div>
		<div class="page__container" v-show="!loading">
			<h1 class="page_title">Правила игры</h1>
			<div class="page__list">
				<div class="box box--1">
					<img
						src="../assets/circle-1.png"
						class="box__image-back image"
						@load="imageLoaded"
					/>
					<img
						src="../assets/characters/hero-2.png"
						class="box__image-main image"
						@load="imageLoaded"
					/>
					<img
						src="../assets/arrow-left.png"
						class="box__image-arrow image"
						@load="imageLoaded"
					/>

					<p class="box__writing">это вы</p>
				</div>
				<p class="page__item">
					«Тап», чтобы лететь. Остальное делает гравитация.
				</p>
				<div class="box box--2">
					<img
						src="../assets/circle-2.png"
						class="box__image-back image"
						@load="imageLoaded"
					/>
					<img
						src="../assets/food/Food-1.png"
						class="box__image-main-1 image"
						@load="imageLoaded"
					/>
					<img
						src="../assets/food/Food-2.png"
						class="box__image-main-2 image"
						@load="imageLoaded"
					/>
					<img
						src="../assets/food/Food-3.png"
						class="box__image-main-3 image"
						@load="imageLoaded"
					/>
					<img
						src="../assets/arrow-right.png"
						class="box__image-arrow image"
						@load="imageLoaded"
					/>

					<p class="box__writing">
						это <br />
						"награды"
					</p>
				</div>
				<p class="page__item">Вы можете собирать их во время полета.</p>

				<div class="box box--3">
					<img
						src="../assets/end.png"
						class="box__image-main image"
						@load="imageLoaded"
					/>
					<img
						src="../assets/end-2.png"
						class="box__image-back image"
						@load="imageLoaded"
					/>
				</div>
				<p class="page__item">
					В конце игры вы отдадите всё собранное котикам. Если
					получится...
				</p>
			</div>
			<div class="page__button">
				<button class="button yellow" @click="onClickBack">
					Назад
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { useGameStore } from "@/stores/gameStore";

export default {
	data() {
		return {
			imagesLoaded: 0,
			totalImages: 10,
			loading: true,
		};
	},
	computed: {},
	methods: {
		onClickBack() {
			const gameStore = useGameStore();
			gameStore.setScreen("start");
		},
		imageLoaded() {
			this.imagesLoaded += 1;
			if (this.imagesLoaded >= this.totalImages) {
				setTimeout(() => {
					this.loading = false;
				}, 500);
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
	watch: {},
};
</script>

<style scoped>
.page {
	width: 100%;
	height: calc(var(--vh, 1vh) * 100);
	overflow: hidden;
	position: relative;
}
.page__container {
	display: flex;
	flex-direction: column;
	height: 100%;
	background: #6080c0;
	padding: 40px 20px 40px 20px;
	overflow: scroll;
}

.page__container--loading {
	align-items: center;
	justify-content: center;
}

.page_title {
	color: white;
	font-size: 32px;
	text-align: center;
}

.page__list {
	padding: 24px 0;
}

.page__item {
	color: white;
	font-size: 20px;
	font-family: "Montserrat Alternates", monospace;
	font-weight: 400;
	padding-block: 16px;
}

.page__button {
	margin-top: auto;
}

.box.box--1 {
	position: relative;
	height: 100px;
	margin-top: 20px;
}

.box.box--1 .box__image-main {
	position: absolute;
	width: 50px;
	left: 34px;
	top: 26px;
}

.box.box--1 .box__image-back {
	position: absolute;
	width: 120px;
	left: 0;
	filter: invert(98%) sepia(89%) saturate(9%) hue-rotate(140deg)
		brightness(100%) contrast(106%);
}

.box.box--1 .box__image-arrow {
	width: 100px;
	position: absolute;
	left: 120px;
	filter: invert(98%) sepia(89%) saturate(9%) hue-rotate(140deg)
		brightness(100%) contrast(106%);
	transform: scaleY(-1);
	rotate: 10deg;
}

.box.box--1 .box__writing {
	font-family: "Neucha", monospace;
	color: #ffffff;
	font-size: 32px;
	position: absolute;
	left: 234px;
	top: -6px;
}

.box.box--2 {
	position: relative;
	height: 130px;
	margin-top: 50px;
}

.box.box--2 .box__image-back {
	position: absolute;
	width: 140px;
	left: 190px;
	filter: invert(98%) sepia(89%) saturate(9%) hue-rotate(140deg)
		brightness(100%) contrast(106%);
}

.box.box--2 .box__image-main-1 {
	position: absolute;
	width: 46px;
	left: 248px;
	top: 30px;
}

.box.box--2 .box__image-main-2 {
	position: absolute;
	width: 40px;
	left: 224px;
	top: 65px;
}

.box.box--2 .box__image-main-3 {
	position: absolute;
	width: 33px;
	left: 273px;
	top: 73px;
}

.box.box--2 .box__image-arrow {
	width: 114px;
	position: absolute;
	left: 71px;
	filter: invert(98%) sepia(89%) saturate(9%) hue-rotate(140deg)
		brightness(100%) contrast(106%);
	transform: scaleY(-1);
	top: 14px;
}

.box.box--2 .box__writing {
	font-family: "Neucha", monospace;
	color: #ffffff;
	font-size: 32px;
	position: absolute;
	left: 8px;
}

.box.box--3 {
	position: relative;
	display: flex;
	margin-bottom: -18px;
	margin-top: 30px;
}

.box.box--3 .box__image-main {
	width: 180px;
	height: 180px;
}

.box.box--3 .box__image-back {
	filter: invert(98%) sepia(89%) saturate(9%) hue-rotate(140deg)
		brightness(100%) contrast(106%);
	width: 150px;
	height: 50px;
	rotate: 30deg;
	margin-top: 48px;
	margin-left: 10px;
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
	background-color: #f0c040;
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
