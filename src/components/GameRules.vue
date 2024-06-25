<template>
	<div class="page">
		<div class="page__container">
            <h1 class="page_title">Правила игры</h1>
			<ol class="page__list">
				<li class="page__item">1. «Тап», чтобы лететь. Остальное сделает гравитация.</li>
                <li class="page__item">2. Собирайте кошачий корм во время полета.</li>
                <li class="page__item">3. Спускайтесь на землю и кормите бездомных котиков по всему миру (ну, почти).</li>
            </ol>
            <div class="page__button">
                <button class="button yellow" @click="onClickBack">
                    Назад
                </button>
            </div>
		</div>
	</div>
</template>

<script>
// Copyright © Kseniia Shlenskaia, 2024. All rights reserved.

import { useGameStore } from "@/stores/gameStore";

export default {
	data() {
		return {};
	},
	computed: {},
	methods: {
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
	background: #6080c0;
	padding: 40px 20px 40px 20px;
	overflow: scroll;
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
    font-size: 22px;
    font-family: 'Montserrat Alternates', monospace;
    font-weight: 400;
    padding: 16px;
}

.page__button {
    margin-top: auto;
}
</style>
