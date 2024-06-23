<template>
	<div class="reward" :style="rewardStyle"></div>
</template>

<script>
const images = [
	require('@/assets/food/Food-1.png'),
	require('@/assets/food/Food-2.png'),
	require('@/assets/food/Food-3.png'),
];

export default {
	props: ["x", "y"],
	data() {
		return {
			selectedImage: null
		};
	},
	created() {
		this.selectedImage = images[Math.floor(Math.random() * images.length)];
	},
	computed: {
		rewardStyle() {
			return {
				left: `${this.x}px`,
				top: `${this.y}px`,
				width: "60px",
				height: "60px",
				backgroundImage: `url(${this.selectedImage})`,
				backgroundSize: "contain",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			};
		}
	}
};
</script>

<style scoped>
.reward {
	position: absolute;
}
</style>
