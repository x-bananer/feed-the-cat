<template>
	<div class="page">
		<div class="page__container">
			<div class="page__header">
				<h1 class="page__title">Выберите город</h1>
			</div>
			<div class="page__content">
				<div class="page__grid">
					<div class="page__card-wrap">
						<div class="page__card" @click="onClickCity('Moscow')">
							<img
								class="page__card-img"
								src="../assets/backgounds/Moscow-min.png"
								alt=""
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
								class="page__card-img"
								src="../assets/backgounds/Istanbul-min.png"
								alt=""
							/>
						</div>
						<p class="page__card-caption">Стамбул</p>
					</div>
					<div class="page__card-wrap">
						<div class="page__card" @click="onClickCity('Minsk')">
							<img
								class="page__card-img"
								src="../assets/backgounds/Minsk-min.png"
								alt=""
							/>
						</div>
						<p class="page__card-caption">Минск</p>
					</div>
					<div class="page__card-wrap">
						<div class="page__card" @click="onClickCity(null)">
						</div>
						<p class="page__card-caption">Минимализм</p>
					</div>
					<!-- <div class="page__card-wrap">
						<div class="page__card" @click="onClickCity('Kair')">
							<img
								class="page__card-img"
								src="../assets/backgounds/Kair.png"
								alt=""
							/>
						</div>
						<p class="page__card-caption">Каир</p>
					</div> -->
				</div>
			</div>
			<div class="page__button">
                <button class="button red" @click="onClickBack">
                    Назад
                </button>
            </div>
		</div>

		<!-- <div class="button yellow">PLAY</div>
    <div class="button blue">PAUSE</div>
    <div class="button red">LOSER</div>
    <div class="button green">DONE</div> -->
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
		onClickCity(city) {
			const gameStore = useGameStore();
			gameStore.setCity(city);

            gameStore.setScreen('game');
		},
		onClickBack() {
			const gameStore = useGameStore();
            gameStore.setScreen('start');
		},
	},
	mounted() {},
	beforeUnmount() {},
	watch: {},
};
</script>

<style scoped>
.page {
	width: 100%;
	height: calc(var(--vh, 1vh)*100);
	overflow: hidden;
	position: relative;
}
.page__container {
	display: flex;
	flex-direction: column;
	height: 100%;
	background: #f0c040;
	padding: 40px 20px 40px 20px;
	overflow: scroll;
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
	font-size: 16px;
    text-align: center;
	color: white;
}

.page__button {
	padding-top: 20px;
    margin-top: auto;
}
</style>
