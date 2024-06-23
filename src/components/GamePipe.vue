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
            };
        },
        pipeBottomStyle() {
            return {
				width: `${this.pipeWidth}px`,
                left: `${this.x}px`,
                height: `calc(100vh - ${this.height + 200}px)`,
                top: `${this.height + 200}px`,
            };
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

.pipe-bottom {
	background-image: url("/src/assets/pipes/Pipe-6.svg");
}

.pipe-top {
	background-image: url("/src/assets/pipes/Pipe-6.svg");
	transform: rotate(180deg);
}
</style>
