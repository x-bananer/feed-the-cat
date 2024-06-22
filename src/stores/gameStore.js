import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useGameStore = defineStore('game', {
    state: () => ({
        birdPosition: { x: 100, y: 200 },
        birdSize: { width: 60, height: 60 },
        birdVelocity: 0,
        gravity: 0.5,
        isGameOver: false,
        isGameRunning: false,
        pipes: [],
        pipeSize: { width: 70, gap: 200 },
        rewards: [],
        rewardSize: { width: 80, height: 80 },
        score: 0,
        moveSpeed: 2,
    }),
    actions: {
        fly() {
            if (!this.isGameRunning) this.isGameRunning = true;
            this.birdVelocity = -8;
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
                pipe.x -= this.moveSpeed;
            });

            if (this.pipes.length && this.pipes[0].x + this.pipeSize.width < 0) {
                this.pipes.shift();
            }

            if (!this.pipes.length || this.pipes[this.pipes.length - 1].x < window.innerWidth - 400) {
                this.spawnPipe();
            }

            if (this.rewards.length === 0 || this.rewards[this.rewards.length - 1].x < window.innerWidth - 500) {
                this.spawnReward();
            }

            this.rewards.forEach(reward => {
                reward.x -= this.moveSpeed;
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
        spawnReward() {
            const maxAttempts = 100;
            let attempts = 0;
            let rewardX, rewardY;
            let isOverlapping;

            do {
                if (attempts >= maxAttempts) return;

                rewardX = window.innerWidth;
                rewardY = Math.floor(Math.random() * (window.innerHeight - this.rewardSize.height));
                isOverlapping = false;

                for (const pipe of this.pipes) {
                    const pipeTop = pipe.height;
                    const pipeBottom = pipe.height + this.pipeSize.gap;
                    const rewardBottom = rewardY + this.rewardSize.height;

                    if (
                        rewardX < pipe.x + this.pipeSize.width && rewardX + this.rewardSize.width > pipe.x &&
                        (rewardY < pipeTop || rewardBottom > pipeBottom)
                    ) {
                        isOverlapping = true;
                        break;
                    }
                }

                if (!isOverlapping) {
                    for (const reward of this.rewards) {
                        const rewardBottom = reward.y + this.rewardSize.height;
                        const newRewardBottom = rewardY + this.rewardSize.height;

                        if (
                            rewardX < reward.x + this.rewardSize.width && rewardX + this.rewardSize.width > reward.x &&
                            rewardY < rewardBottom && newRewardBottom > reward.y
                        ) {
                            isOverlapping = true;
                            break;
                        }
                    }
                }

                attempts++;
            } while (isOverlapping);

            if (!isOverlapping) {
                this.rewards.push({
                    id: uuidv4(), // добавляем уникальный идентификатор
                    x: rewardX,
                    y: rewardY
                });
            }
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
