<template>
	<div class="reward" :style="rewardStyle"></div>
</template>

<script>
export default {
	props: ["x", "y"],
	computed: {
		images() {
			return [
				require('@/assets/food/Food-1.png'),
				require('@/assets/food/Food-2.png'),
				require('@/assets/food/Food-3.png'),
			];
		},
		selectedImage() {
			return this.images[Math.floor(Math.random() * this.images.length)];
		},
		rewardStyle() {
			return {
				left: `${this.x}px`,
				top: `${this.y}px`,
				width: "80px",
				height: "80px",
				backgroundImage: `url(${this.selectedImage})`,
				backgroundSize: "contain",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			};
		},
	},
};
</script>

<style scoped>
.reward {
	position: absolute;
}
</style>

