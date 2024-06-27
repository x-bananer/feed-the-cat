<template>
	<div class="reward" :class="'reward-' + selectedImage" :style="rewardStyle"></div>
</template>

<script>


const images = [1, 2, 3];

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
.reward-1 {
	background-image: url('../assets/food/Food-1.png');
}

.reward-2 {
	background-image: url('../assets/food/Food-2.png');
}

.reward-3 {
	background-image: url('../assets/food/Food-3.png');
}
</style>
