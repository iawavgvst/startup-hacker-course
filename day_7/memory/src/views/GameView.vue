<template>
    <div class="s-gameview">
        <div class="s-gameview-container">
            <div class="s-gameview-header">
                <div class="s-gameview-header-left">
                    <router-link to="/" class="s-back-button">
                        ← Назад к выбору
                    </router-link>
                </div>
                <div class="s-gameview-header-center">
                    <h2 class="s-gameview-header-center-title">
                        Начинай игру!
                    </h2>
                </div>
                <div class="s-gameview-header-right">
                    <SButton @click="resetGame" class="s-reset-button">
                        Сбросить игру
                    </SButton>
                </div>
            </div>
            <div class="s-gameview-content">
                <GameStats
                    :moves="moves"
                    :remaining-cards="remainingCards"
                    :total-cards="totalCards"
                    :difficulty="difficulty"
                    :game-time="gameTime"
                    :game-started="gameStarted"
                    :game-finished="gameFinished"
                    :score="score"
                />
                <GameBoard
                    :difficulty="difficulty"
                    :game-started="gameStarted"
                    :game-finished="gameFinished"
                    @card-click="handleCardClick"
                    @game-start="startGame"
                    @game-finish="finishGame"
                    @move-made="incrementMoves"
                    ref="gameBoardRef"
                />
                <div class="s-gameview-result" v-if="gameFinished">
                    <div class="s-gameview-result-card">
                        <div class="s-gameview-result-icon">🏆</div>
                        <div class="s-gameview-result-content">
                            <h3 class="s-gameview-result-title">Игра завершена!</h3>
                            <div class="s-gameview-result-actions">
                                <SButton @click="playAgain" class="s-action-button primary">
                                    Играть снова
                                </SButton>
                                <router-link to="/" class="s-action-button secondary">
                                    На главную
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GameStats from "@/components/GameStats.vue";
import GameBoard from "@/components/GameBoard.vue";
import { SButton } from 'startup-ui';

const route = useRoute()

const difficulty = ref(route.query.difficulty || 'easy')

const moves = ref(0)
const gameTime = ref(0)
const gameStarted = ref(false)
const gameFinished = ref(false)
const score = ref('')
const gameBoardRef = ref(null)

let timer = null

const difficultyConfig = {
    easy: { pairs: 6, total: 12, label: 'Легкий (12 карточек)' },
    medium: { pairs: 12, total: 24, label: 'Средний (24 карточки)' },
    hard: { pairs: 18, total: 36, label: 'Сложный (36 карточек)' }
}

const totalCards = computed(() => {
    return difficultyConfig[difficulty.value]?.total || 24
})

const remainingCards = computed(() => {
    if (!gameBoardRef.value) return totalCards.value
    return gameBoardRef.value.getRemainingCards()
})

const handleCardClick = () => {
    if (!gameStarted.value) {
        gameStarted.value = true
        startTimer()
    }
}

const incrementMoves = () => {
    moves.value++
}

const startGame = () => {
    gameStarted.value = true
    startTimer()
}

const finishGame = () => {
    gameFinished.value = true
    if (timer) {
        clearInterval(timer)
        timer = null
    }
    calculateScore()
}

const startTimer = () => {
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        gameTime.value++
    }, 1000)
}

const calculateScore = () => {
    const config = difficultyConfig[difficulty.value] || difficultyConfig.medium
    const maxMoves = config.pairs * 3
    const efficiency = (maxMoves - moves.value) / maxMoves

    if (efficiency > 0.8) score.value = 'Замечательно!'
    else if (efficiency > 0.6) score.value = 'Хорошо получилось!'
    else if (efficiency > 0.4) score.value = 'Ты точно можешь лучше!'
    else score.value = 'Лучше попробуй еще раз!'
}

const resetGame = async () => {
    moves.value = 0
    gameTime.value = 0
    gameStarted.value = false
    gameFinished.value = false
    score.value = ''

    if (timer) {
        clearInterval(timer)
        timer = null
    }

    await nextTick()
    if (gameBoardRef.value) {
        gameBoardRef.value.resetGame()
    }
}

const playAgain = () => {
    resetGame()
}

onMounted(() => {
    if (!route.query.difficulty) {
        difficulty.value = 'easy'
    }
})

watch(() => route.query.difficulty, (newDifficulty) => {
    if (newDifficulty) {
        difficulty.value = newDifficulty
        resetGame()
    }
})
</script>

<style scoped>
.s-gameview {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

.s-gameview-container {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
}

.s-gameview-header {
    background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
    color: whitesmoke;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .s-gameview-header-left,
    .s-gameview-header-right {
        flex: 1;
    }

    .s-gameview-header-center {
        flex: 2;
        text-align: center;
    }

    .s-back-button {
        color: white;
        text-decoration: none;
        font-weight: 500;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        transition: background 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    }

    .s-reset-button {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        float: right;

        &:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
        }
    }
}

.s-gameview-content {
    padding: 30px;
}

.s-gameview-result {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #eee;

    .s-gameview-result-card {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

        .s-gameview-result-icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }

        .s-gameview-result-content {
            .s-gameview-result-title {
                color: #333;
                font-size: 2rem;
                margin-bottom: 25px;
            }

            .s-gameview-result-actions {
                display: flex;
                gap: 15px;
                justify-content: center;

                .s-action-button {
                    padding: 15px 30px;
                    border-radius: 10px;
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.3s ease;

                    &.primary {
                        background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
                        color: white;
                        border: none;

                        &:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
                        }
                    }

                    &.secondary {
                        background: white;
                        color: steelblue;
                        border: 2px solid steelblue;
                        padding: 20px 30px;

                        &:hover {
                            background: steelblue;
                            color: whitesmoke;
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .s-gameview-header {
        flex-direction: column;
        gap: 15px;
        padding: 15px;

        .s-gameview-header-left,
        .s-gameview-header-center,
        .s-gameview-header-right {
            width: 100%;
            text-align: center;
        }

        .s-gameview-header-center-title {
            flex-direction: column;
            gap: 10px;
            font-size: 1.5rem;
        }
    }

    .s-gameview-content {
        padding: 15px;
    }

    .s-gameview-result {
        .s-gameview-result-card {
            padding: 25px;

            .s-gameview-result-actions {
                flex-direction: column;

                .s-action-button {
                    width: 100%;
                }
            }
        }
    }
}
</style>
