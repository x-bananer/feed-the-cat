<template>
	<div class="bird" :style="birdStyle"></div>
</template>

<script>
import { useGameStore } from "@/stores/gameStore";
import { mapState } from "pinia";

export default {
	computed: {
		...mapState(useGameStore, ["birdPosition"]),
		birdStyle() {
			return {
				left: `${this.birdPosition.x}px`,
				top: `${this.birdPosition.y}px`,
			};
		},
	},
};
</script>

<style scoped>
.bird {
	width: 50px;
	height: 50px;
	background-color: yellow;
	border-radius: 50%;
	position: absolute;
}
</style>
