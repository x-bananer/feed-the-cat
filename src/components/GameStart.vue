<template>
	<div class="game">
		<div class="game__container">
			<div class="button done" @click="onClickChooseMode('feedCats')">
				Кормить котов
			</div>
			<div class="button pause" @click="onClickChooseMode('free')">
				Свободный режим
			</div>
			<div class="button loser" @click="onClickChooseMode('rules')">
				Правила
			</div>
		</div>

		<!-- <div class="button play">PLAY</div>
    <div class="button pause">PAUSE</div>
    <div class="button loser">LOSER</div>
    <div class="button done">DONE</div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {},
	methods: {
		onClickChooseMode(mode) {
			this.$emit("chooseMode", mode);
		},
	},
	mounted() {},
	beforeUnmount() {},
	watch: {},
};
</script>

<style scoped>
.game {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative;
	padding: 20px;
}
.game__container {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	height: 100%;
	flex-direction: column;
	margin-top: -80px;
}

.game__logo {
}

.game__logo-img {
	width: auto;
	height: 80px;
}

.background-image {
	image-rendering: pixelated;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #f0c040;
	z-index: -1;
}
</style>
