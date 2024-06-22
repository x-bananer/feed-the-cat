<template>
	<div class="reward" :style="rewardStyle"></div>
</template>

<script>
export default {
	props: ["x", "y"],
	computed: {
		rewardStyle() {
			return {
				left: `${this.x}px`,
				top: `${this.y}px`,
				width: "80px",
				height: "80px",
			};
		},
	},
};
</script>

<style scoped>
.reward {
	background-color: purple;
	position: absolute;
}
</style>
