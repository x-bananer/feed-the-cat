// src/stores/gameStore.js
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
    state: () => ({
        birdPosition: { x: 100, y: 200 },
        birdSize: { width: 50, height: 50 },
        birdVelocity: 0,
        gravity: 0.6,
        isGameOver: false,
        isGameRunning: false,
        pipes: [],
        pipeSize: { width: 50, gap: 300 },
        rewards: [],
        rewardSize: { width: 120, height: 120 },
        score: 0,
        level: 1,
        pipesPassed: 0,
        rewardsCollected: 0,
        isLevelComplete: false,
    }),
    actions: {
        fly() {
            if (!this.isGameRunning) this.isGameRunning = true;
            this.birdVelocity = -10;
        },
        fall() {
            if (this.isGameOver || !this.isGameRunning) return;

            this.birdVelocity += this.gravity;
            this.birdPosition.y += this.birdVelocity;

            const gameHeight = window.innerHeight;
            console.log(gameHeight, 'gameHeight')
            
            if (this.birdPosition.y > gameHeight - 50 || this.birdPosition.y < 0) {
                this.endGame();
            }

            this.pipes.forEach(pipe => {
                const birdRight = this.birdPosition.x + this.birdSize.width;
                const birdBottom = this.birdPosition.y + this.birdSize.height;
                const pipeRight = pipe.x + this.pipeSize.width;
                const pipeBottom = pipe.y + pipe.height;
            
                const horizontalCollision = this.birdPosition.x < pipeRight && birdRight > pipe.x;
                const verticalCollisionTop = this.birdPosition.y < pipe.height;
                const verticalCollisionBottom = birdBottom > pipeBottom;
            
                const birdInGap = this.birdPosition.y > pipe.height && birdBottom < pipe.y;
            
                console.log(`Bird: (${this.birdPosition.x}, ${this.birdPosition.y}), Bird Bottom: ${birdBottom}, Pipe: (${pipe.x}, ${pipe.height}), Pipe Bottom: ${pipeBottom}, Horizontal Collision: ${horizontalCollision}, Vertical Collision Top: ${verticalCollisionTop}, Vertical Collision Bottom: ${verticalCollisionBottom}, Bird In Gap: ${birdInGap}`);
            
                if (horizontalCollision && (verticalCollisionTop || verticalCollisionBottom) && !birdInGap) {
                    this.endGame();
                }
            });
            


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
                    this.rewardsCollected += 1;
                    return false;
                }
                return true;
            });

            this.moveElements();
        },
        moveElements() {
            this.pipes.forEach(pipe => {
                pipe.x -= 2;
            });
            this.pipes = this.pipes.filter(pipe => pipe.x + this.pipeSize.width > 0);

            this.rewards.forEach(reward => {
                reward.x -= 2;
            });
            this.rewards = this.rewards.filter(reward => reward.x + this.rewardSize.width > 0);

            const pipeThreshold = window.innerWidth - 800;
            const levelConfigs = [
                { pipes: 5, rewards: 3 },
                { pipes: 10, rewards: 6 },
                { pipes: 15, rewards: 9 },
            ];
            const currentConfig = levelConfigs[this.level - 1];

            if (this.pipes.length === 0 || this.pipes[this.pipes.length - 1].x < pipeThreshold) {
                if (this.pipesPassed < currentConfig.pipes) {
                    const pipeHeight = Math.floor(Math.random() * (window.innerHeight - this.pipeSize.gap - 100)) + 50;
                    this.pipes.push({ x: window.innerWidth, y: 0, height: pipeHeight });
                    this.pipes.push({ x: window.innerWidth, y: pipeHeight + this.pipeSize.gap, height: window.innerHeight - pipeHeight - this.pipeSize.gap });
                    this.pipesPassed += 1;
                }
            }

            if (this.rewards.length === 0 || this.rewards[this.rewards.length - 1].x < pipeThreshold) {
                if (this.rewardsCollected < currentConfig.rewards) {
                    const rewardY = Math.floor(Math.random() * (window.innerHeight - this.rewardSize.height - 60)) + 30;
                    this.rewards.push({ x: window.innerWidth + 100, y: rewardY });
                }
            }

            if (this.pipesPassed >= currentConfig.pipes && this.pipes[this.pipes.length - 1].x + this.pipeSize.width < 0) {
                this.levelComplete();
            }
        },
        levelComplete() {
            this.isGameRunning = false;
            this.isLevelComplete = true;
            if (this.level === 3) {
                alert('Поздравляем! Ты победил.');
            } else {
                alert('Поздравляем! На следующий уровень.');
            }
            this.level += 1;
            this.pipesPassed = 0;
            this.rewardsCollected = 0;
            this.resetGame();
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
            this.isLevelComplete = false;
        },
    },
});


