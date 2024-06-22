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
				width: "120px",
				height: "120px",
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
