<template>
	<div class="page">
		<div class="page__container">
			<div class="button blue" @click="onClickStart">
				Кормить котов
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
			const gameStore = useGameStore();
            gameStore.setScreen('city');
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
	margin-top: -80px;
}
</style>
