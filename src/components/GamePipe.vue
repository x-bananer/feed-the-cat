<template>
    <div>
        <div class="pipe-top" :style="pipeTopStyle"></div>
        <div class="pipe-bottom" :style="pipeBottomStyle"></div>
    </div>
</template>

<script>
export default {
    props: ["x", "height"],
    computed: {
        pipeTopStyle() {
            return {
                left: `${this.x}px`,
                height: `${this.height}px`,
                top: 0,
            };
        },
        pipeBottomStyle() {
            return {
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
	width: 50px;
    /* background-color: #E55229; */
    position: absolute;
    filter: contrast(0.8) opacity(1);
	
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* background: linear-gradient(rgb(99, 8, 125), rgb(212, 71, 47), rgb(161, 201, 57)) !important; */
}

.pipe-bottom {
	background-image: url("/src/assets/pipes/Pipe-4.png");
}

.pipe-top {
	background-image: url("/src/assets/pipes/Pipe-5.png");
}
/* 
.pipe-bottom:before {
	content: "";
    border: 1rem solid #FCF65C;
    -o-border-image: repeating-linear-gradient(45deg, transparent, transparent 5px, #FCF65C 6px, #FCF65C 15px, transparent 16px, transparent 20px) 20 / 1rem;
    border-image: repeating-linear-gradient(45deg, transparent, transparent 5px, #FCF65C 6px, #FCF65C 15px, transparent 16px, transparent 20px) 20 / 1rem;
    width: 50px;
    display: block;
    position: relative;
    bottom: 0px;
    height: calc(100% + 20px);
}

.pipe-top:before {
	content: "";
    border: 1rem solid #FCF65C;
    -o-border-image: repeating-linear-gradient(45deg, transparent, transparent 5px, #FCF65C 6px, #FCF65C 15px, transparent 16px, transparent 20px) 20 / 1rem;
    border-image: repeating-linear-gradient(45deg, transparent, transparent 5px, #FCF65C 6px, #FCF65C 15px, transparent 16px, transparent 20px) 20 / 1rem;
    width: 50px;
    display: block;
    position: relative;
    top: -20px;
    height: calc(100% + 20px);
} */

.pipe-top {
	border-bottom-right-radius: 8px;
	border-bottom-left-radius: 8px;
}

.pipe-bottom {
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	
}
</style>
