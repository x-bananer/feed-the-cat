import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
    state: () => ({
        birdPosition: { x: 100, y: 200 },
        birdSize: { width: 50, height: 50 },
        birdVelocity: 0,
        gravity: 0.5,
        isGameOver: false,
        isGameRunning: false,
        pipes: [], // список труб
        pipeSize: { width: 50, gap: 200 }, // уменьшил размер зазора для большей сложности
        rewards: [],
        rewardSize: { width: 120, height: 120 },
        score: 0,
    }),
    actions: {
        fly() {
            if (!this.isGameRunning) this.isGameRunning = true;
            this.birdVelocity = -7;
        },
        fall() {
            if (this.isGameOver || !this.isGameRunning) return;

            this.birdVelocity += this.gravity;
            this.birdPosition.y += this.birdVelocity;

            const gameHeight = window.innerHeight;
            
            if (this.birdPosition.y > gameHeight - this.birdSize.height || this.birdPosition.y < 0) {
                this.endGame();
                return;
            }

            const birdRight = this.birdPosition.x + this.birdSize.width;
            const birdBottom = this.birdPosition.y + this.birdSize.height;

            // Проверка столкновения с трубами
            for (const pipe of this.pipes) {
                const pipeRight = pipe.x + this.pipeSize.width;
                const pipeGapTop = pipe.height;
                const pipeGapBottom = pipe.height + this.pipeSize.gap;

                const horizontalCollision = this.birdPosition.x < pipeRight && birdRight > pipe.x;
                const birdInGap = this.birdPosition.y > pipeGapTop && birdBottom < pipeGapBottom;

                if (horizontalCollision && !birdInGap) {
                    this.endGame();
                    return;
                }
            }

            // Проверка столкновений с наградами
            this.rewards = this.rewards.filter(reward => {
                const birdRight = this.birdPosition.x + this.birdSize.width;
                const birdBottom = this.birdPosition.y + this.birdSize.height;
                const rewardRight = reward.x + this.rewardSize.width;
                const rewardBottom = reward.y + this.rewardSize.height;

                const horizontalCollision = this.birdPosition.x < rewardRight && birdRight > reward.x;
                const verticalCollision = this.birdPosition.y < rewardBottom && birdBottom > reward.y;

                if (horizontalCollision && verticalCollision) {
                    this.score += 1;
                    return false;
                }
                return true;
            });

            this.moveElements();
        },
        moveElements() {
            this.pipes.forEach(pipe => {
                pipe.x -= 3;
            });

            if (this.pipes.length && this.pipes[0].x + this.pipeSize.width < 0) {
                this.pipes.shift();
            }

            if (!this.pipes.length || this.pipes[this.pipes.length - 1].x < window.innerWidth - 400) {
                this.spawnPipe();
            }

            this.rewards.forEach(reward => {
                reward.x -= 2;
            });
            this.rewards = this.rewards.filter(reward => reward.x + this.rewardSize.width > 0);
        },
        spawnPipe() {
            const pipeHeight = Math.floor(Math.random() * (window.innerHeight - this.pipeSize.gap - 100)) + 50;
            this.pipes.push({
                x: window.innerWidth,
                height: pipeHeight
            });
        },
        endGame() {
            this.isGameOver = true;
            this.isGameRunning = false;
        },
        resetGame() {
            this.birdPosition = { x: 100, y: 200 };
            this.birdVelocity = 0;
            this.isGameOver = false;
            this.isGameRunning = false;
            this.pipes = [];
            this.rewards = [];
            this.score = 0;
            this.spawnPipe();
        },
    },
});
