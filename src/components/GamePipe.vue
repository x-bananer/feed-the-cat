<template>
	<div>
		<div class="pipe-top" :style="pipeTopStyle"></div>
		<div class="pipe-bottom" :style="pipeBottomStyle"></div>
	</div>
</template>

<script>
import { useGameStore } from "@/stores/gameStore";

export default {
	props: ["x", "height"],
	data() {
		return {
			selectedImage: this.getRandomPipeImage(),
		};
	},
	computed: {
		pipeWidth() {
			const gameStore = useGameStore();
			return gameStore.getPipeWidth;
		},
		pipeTopStyle() {
			return {
				width: `${this.pipeWidth}px`,
				left: `${this.x}px`,
				height: `${this.height}px`,
				top: 0,
				backgroundImage: `url(${this.selectedImage})`,
				transform: "rotate(180deg)",
			};
		},
		pipeBottomStyle() {
			return {
				width: `${this.pipeWidth}px`,
				left: `${this.x}px`,
				height: `calc(100vh - ${this.height + 200}px)`,
				top: `${this.height + 200}px`,
				backgroundImage: `url(${this.selectedImage})`,
			};
		},
	},
	methods: {
		getRandomPipeImage() {
			const images = [
				require("@/assets/pipes/Pipe-6.svg"),
				require("@/assets/pipes/Pipe-7.svg"),
			];
			return images[Math.floor(Math.random() * images.length)];
		},
	},
};
</script>

<style scoped>
.pipe-top,
.pipe-bottom {
	position: absolute;
	background-size: cover;
	background-repeat: no-repeat;
}
</style>
