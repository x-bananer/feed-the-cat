<template>
	<div class="pipe" :style="pipeStyle"></div>
</template>

<script>
export default {
	props: ["x", "y", "height"],
	computed: {
		pipeStyle() {
			return {
				left: `${this.x}px`,
				height: `${this.height}px`,
				top: `${this.y}px`,
			};
		},
	},
};
</script>

<style scoped>
.pipe {
	width: 50px;
	background-color: green;
	position: absolute;
}
</style>
