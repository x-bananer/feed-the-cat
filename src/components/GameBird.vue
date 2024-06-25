<template>
	<div class="moving" :style="birdStyle">
		<div class="moving__border">
			<div class="moving__image"></div>
		</div>
	
	</div>
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
				position: "absolute"
			};
		},
	},
};
</script>

<style scoped>
.moving {
	width: 60px;
	height: 60px;
	position: absolute;
	background-color: transparent;
	display: flex;
    align-items: center;
    justify-content: center;
	z-index: 1;
}

.moving__border {
	min-width: 80px;
	min-height: 80px;
	width: 80px;
	height: 80px;
	display: flex;
    align-items: center;
    justify-content: center;
	border: 1px dashed yellow;
	border-radius: 50%;
	padding: 8px;
}

.moving__image {
	width: 100%;
	height: 100%;
	background-image: url('../assets/characters/hero-2.png');
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	transform: rotate(25deg);
}
</style>
