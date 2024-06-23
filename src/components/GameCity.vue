<template>
	<div class="game">
		<div class="game__logo">
			<img class="game__logo-img" src="../assets/logo.png" alt="" />
		</div>
		<div class="game__container">
			<div class="background-image" :style="backgroundStyle"></div>

            <!-- <div class="card" v-for="i in 5" :key="i">
                <img class="card__image" src="../assets/backgounds/Moscow.png" alt="">
            </div> -->
            <div class="grid">
            <div class="card"><img class="card__image" src="../assets/backgounds/Moscow.png" alt=""></div>
            <div class="card"><img class="card__image" src="../assets/backgounds/Moscow.png" alt=""></div>
            <div class="card"><img class="card__image" src="../assets/backgounds/Moscow.png" alt=""></div>
            <div class="card"><img class="card__image" src="../assets/backgounds/Moscow.png" alt=""></div>
            <div class="card"><img class="card__image" src="../assets/backgounds/Moscow.png" alt=""></div>
        </div>
		</div>

       

		<!-- <div class="button play">PLAY</div>
    <div class="button pause">PAUSE</div>
    <div class="button loser">LOSER</div>
    <div class="button done">DONE</div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	computed: {},
	methods: {
		onClickChooseMode(mode) {
			this.$emit("chooseMode", mode);
		},
	},
	mounted() {},
	beforeUnmount() {},
	watch: {},
};
</script>

<style scoped>

.grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }

        .card {
            flex: 1 1 calc(50% - 20px);
            background-color: #f0f0f0;
            padding: 20px;
            box-sizing: border-box;
        }

/* .card {
	border: 4px solid #333;
	width: calc((100vh - 50px) / 2);
	border-radius: 12px;
	overflow: hidden;
} */

.card__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.game {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative;
	padding: 20px;
}
.game__container {
	/* display: flex;
	align-items: center;
	justify-content: center; */

	height: 100%;
	
}

.game__logo {
}

.game__logo-img {
	width: auto;
	height: 80px;
}

.background-image {
	image-rendering: pixelated;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #f0c040;
	/* //background-image: url("/src/assets/backgounds/Moscow.png");
	background-size: cover;
	background-position: center; */
	/* filter: contrast(var(--background-contrast, 1))
		opacity(var(--background-opacity, 1)); */
	z-index: -1;
}

.score {
	position: absolute;
	top: 10px;
	left: 10px;
	font-size: 24px;
	color: white;
}

.game-over,
.level-complete {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 48px;
	color: red;
}

.game-over {
	display: flex;
	align-content: center;
	justify-content: center;
	text-align: center;
	color: #ffffff;
	flex-direction: column;
	font-size: 32px;
	background: rgba(96, 128, 192, 0.8);
	/* border-radius: 8px; */
	padding: 24px 16px;
	width: calc(100vw - 40px);
	border: 4px solid rgb(77, 102, 153);
	box-shadow: 4px 4px rgb(61, 82, 123);
}
</style>
