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
    background-color: green;
    position: absolute;
}
</style>
