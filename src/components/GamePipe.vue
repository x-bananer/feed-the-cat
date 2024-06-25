<template>
	<div>
		<div class="pipe-top" :class="pipeColorClass" :style="pipeTopStyle"></div>
		<div class="pipe-bottom" :class="pipeColorClass" :style="pipeBottomStyle"></div>
	</div>
</template>

<script>
// Copyright © Kseniia Shlenskaia, 2024. All rights reserved.

import { useGameStore } from "@/stores/gameStore";
import { mapState } from "pinia";

export default {
	props: ["x", "height"],
	computed: {
		...mapState(useGameStore, [
			"currentCityName",
		]),
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
				
			};
		},
		pipeBottomStyle() {
			return {
				width: `${this.pipeWidth}px`,
				left: `${this.x}px`,
				height: `calc((var(--vh, 1vh)*100) - ${this.height + 200}px)`,
				top: `${this.height + 200}px`,
			};
		},
		pipeColorClass() {
			const vars = {
				Minsk: 'pipe-green',
				Kair: 'pipe-green',
				Moscow: 'pipe-red',
				Istanbul: 'pipe-red',
			}
			return vars[this.currentCityName] || 'pipe-green';
			//if (this.currentCityName === 'Minsk' || this.currentCityName === 'Kair')
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

.pipe-top {
	transform: rotate(180deg);
}

.pipe-red {
	background-image: url('../assets/pipes/Pipe-6.svg');
}

.pipe-green {
	background-image: url('../assets/pipes/Pipe-7.svg');
}
</style>
