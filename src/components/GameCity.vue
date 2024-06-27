<template>
	<div class="page">
		<div class="page__container page__container--loading" v-show="loading">
			<span class="loader"></span>
		</div>
		<div class="page__container" v-show="!loading">
			<div class="page__header">
				<h1 class="page__title">Выберите город</h1>
			</div>
			<div class="page__content">
				<div class="page__grid">
					<div class="page__card-wrap">
						<div class="page__card" @click="onClickCity('Moscow')">
							<img
								class="image page__card-img"
								src="../assets/backgounds/Moscow.png"
								alt=""
								@load="imageLoaded"
							/>
						</div>
						<p class="page__card-caption">Москва</p>
					</div>
					<div class="page__card-wrap">
						<div
							class="page__card"
							@click="onClickCity('Istanbul')"
						>
							<img
								class="image page__card-img"
								src="../assets/backgounds/Istanbul.png"
								alt=""
								@load="imageLoaded"
							/>
						</div>
						<p class="page__card-caption">Стамбул</p>
					</div>
					<div class="page__card-wrap">
						<div class="page__card" @click="onClickCity('Minsk')">
							<img
								class="image page__card-img"
								src="../assets/backgounds/Minsk.png"
								alt=""
								@load="imageLoaded"
							/>
						</div>
						<p class="page__card-caption">Минск</p>
					</div>
					<div class="page__card-wrap">
						<div
							class="page__card"
							@click="onClickCity(null)"
						></div>
						<p class="page__card-caption">Минимализм</p>
					</div>
				</div>
			</div>
			<div class="page__button">
				<button class="button red" @click="onClickBack">Назад</button>
			</div>
		</div>
	</div>
</template>

<script>
// Copyright © Kseniia Shlenskaia, 2024. All rights reserved.

import { useGameStore } from "@/stores/gameStore";

export default {
	data() {
		return {
			imagesLoaded: 0,
			totalImages: 3,
			loading: true,
		};
	},
	computed: {},
	methods: {
		onClickCity(city) {
			const gameStore = useGameStore();
			gameStore.setCity(city);

			gameStore.setScreen("game");
		},
		onClickBack() {
			const gameStore = useGameStore();
			gameStore.setScreen("start");
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
	height: 100%;
	background: #f0c040;
	padding: 40px 20px 40px 20px;
	overflow: scroll;
}

.page__container--loading {
	display: flex;
	align-items: center;
	justify-content: center;
}

.page__title {
	font-size: 32px;
	text-align: center;
	color: white;
}

.page__header + .page__content {
	margin-top: 32px;
}

.page__grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.page__card-wrap {
	flex: 1 1 calc(50% - 20px);
	min-height: 220px;
}

.page__card {
	padding: 0;
	box-sizing: border-box;
	background: #f0c040;
	border: 4px solid rgb(77, 102, 153);
	box-shadow: 4px 4px rgb(61, 82, 123);
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100% - 32px);
}

.page__card-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.page__card-caption {
	padding-top: 8px;
	font-size: 20px;
	text-align: center;
	color: white;
	font-family: "Montserrat Alternates", monospace;
	font-weight: 400;
}

.page__button {
	padding-top: 20px;
	margin-top: auto;
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
