<template>
    <div class="s-homeview">
        <div class="s-homeview-section">
            <div class="s-homeview-section-content">
                <h2 class="s-homeview-section-title">Добро пожаловать в игру!</h2>
                <p class="s-homeview-section-subtitle">
                    Проверьте свою память - найдите все пары карточек как можно быстрее!
                </p>
                <p class="s-homeview-section-description">
                    Эта игра хорошо подходит для всех возрастов и помогает развивать
                    концентрацию и внимательность, а также повышает визуальную память.
                </p>
            </div>
        </div>
        <div class="s-homeview-difficulty-section">
            <div class="s-homeview-difficulty-section-header">
              <h3>Выберите уровень сложности:</h3>
            </div>

                <div class="s-homeview-difficulty-cards">
                    <div
                        v-for="option in difficultyOptions"
                        :key="option.value"
                        class="s-homeview-difficulty-card"
                        :class="{ 'selected': selectedDifficulty === option.value }"
                        @click="selectDifficulty(option.value)"
                    >
                        <div class="s-homeview-difficulty-icon">
                            {{ option.icon }}
                        </div>
                        <div class="s-homeview-difficulty-content">
                            <h4 class="s-homeview-difficulty-name">{{ option.label }}</h4>
                            <p class="s-homeview-difficulty-description">{{ option.description }}</p>
                          <div class="s-homeview-difficulty-stats">
                              <span class="s-homeview-difficulty-stats_stat-item">{{ option.cards }} карточек</span>
                              <span class="s-homeview-difficulty-stats_stat-item">{{ option.pairs }} пар</span>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="s-homeview-start-section">
                    <div class="s-homeview-selected-info" v-if="selectedDifficulty">
                        <div class="s-homeview-info-card">
                            <div class="s-homeview-info-icon"><FontAwesomeIcon icon="check"></FontAwesomeIcon></div>
                                <div class="s-homeview-info-content">
                                    <div class="s-homeview-info-title">Вы выбрали:</div>
                                    <div class="s-homeview-info-value">
                                        {{ getDifficultyLabel(selectedDifficulty) }}
                                    </div>
                                </div>
                        </div>
                    </div>
                <SButton
                    class="s-start-button"
                    @click="startGame"
                    :disabled="!selectedDifficulty"
                >
                   Начать игру
                </SButton>
                <div class="s-homeview-game-rules">
                    <h4>Правила игры:</h4>
                    <ul>
                        <li>Найдите все пары одинаковых карточек.</li>
                        <li>Кликайте по карточкам, чтобы перевернуть их.</li>
                        <li>Если две карточки совпадают - они удаляются из колоды.</li>
                        <li>Если не совпадают - они переворачиваются обратно.</li>
                        <li>Старайтесь сделать как можно меньше ходов.</li>
                        <li>Игра завершается, когда на экране не останется ни одной карточки.</li>
                    </ul>
                </div>
                </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { SButton } from 'startup-ui'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const router = useRouter()
const selectedDifficulty = ref('easy')

const difficultyOptions = [
    {
        value: 'easy',
        label: 'Легкий',
        icon: '😊',
        cards: 12,
        pairs: 6,
        description: 'Идеально подходит всем начинающих'
    },
    {
        value: 'medium',
        label: 'Средний',
        icon: '🤔',
        cards: 24,
        pairs: 12,
        description: 'Стандартный уровень выбора для всех игроков'
    },
    {
        value: 'hard',
        label: 'Сложный',
        icon: '🧠',
        cards: 36,
        pairs: 18,
        description: 'Для тех, кто хочет проверить свою память'
    }
]

const selectDifficulty = (value) => {
    selectedDifficulty.value = value
}

const getDifficultyLabel = (value) => {
    const option = difficultyOptions.find(opt => opt.value === value)
    return option ? `${option.label} (${option.cards} карточек)` : ''
}

const startGame = () => {
    if (selectedDifficulty.value) {
        router.push({
            path: '/start',
            query: { difficulty: selectedDifficulty.value }
        })
    }
}
</script>

<style scoped>
.s-homeview {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.s-homeview-section {
    background: white;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    text-align: center;

    .s-homeview-section-content {
        max-width: 800px;
        margin: 0 auto;
    }

    .s-homeview-section-title {
        color: #333;
        font-size: 1.8rem;
        margin-bottom: 15px;
        background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .s-homeview-section-subtitle {
        color: #666;
        font-size: 1rem;
        line-height: 1.6;
    }
}

.s-homeview-section-description {
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
}

.s-homeview-difficulty-section {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

    .s-homeview-difficulty-section-header {
        text-align: center;
        margin-bottom: 40px;

        h3 {
            color: #333;
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        p {
            color: #666;
            font-size: 1.1rem;
        }
    }
}

.s-homeview-difficulty-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.s-homeview-difficulty-card {
    background: #f8f9fa;
    border: 3px solid #e0e0e0;
    border-radius: 15px;
    padding: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    gap: 20px;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        border-color: steelblue;
    }

    &.selected {
        border-color: steelblue;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);

        .s-homeview-difficulty-icon {
            background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
            color: whitesmoke;
        }
    }

    .s-homeview-difficulty-icon {
        font-size: 2rem;
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 50%;
        flex-shrink: 0;
        transition: all 0.3s ease;
    }

    .s-homeview-difficulty-content {
        flex: 1;

        .s-homeview-difficulty-name {
            color: #333;
            font-size: 1rem;
            margin-bottom: 10px;
        }

        .s-homeview-difficulty-description {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.5;
            font-size: 0.9rem;
        }

        .s-homeview-difficulty-stats {
            display: flex;
            gap: 15px;

            .s-homeview-difficulty-stats_stat-item {
                background: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 0.8rem;
                color: steelblue;
                font-weight: 500;
            }
        }
    }
}

.s-homeview-start-section {
    text-align: center;

    .s-homeview-selected-info {
        margin-bottom: 30px;

        .s-homeview-info-card {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
            color: whitesmoke;
            padding: 20px 30px;
            border-radius: 15px;

            .s-homeview-info-icon {
               font-size: 1.5rem;
               background-color: #2E7D32;
               border: 2px solid white;
            }

            .s-homeview-info-content {
               text-align: left;

               .s-homeview-info-title {
                  font-size: 1rem;
                  opacity: 0.9;
                  margin-bottom: 5px;
               }

               .s-homeview-info-value {
                  font-size: 1rem;
                  font-weight: bold;
               }
            }
        }
    }

    .s-start-button {
        background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
        color: white;
        border: none;
        padding: 15px 35px;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 40px;

        &:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(76, 175, 80, 0.3);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .s-homeview-game-rules {
        background: #f8f9fa;
        border-radius: 15px;
        padding: 20px;
        text-align: left;
        max-width: 500px;
        margin: 0 auto;

        h4 {
            color: #333;
            font-size: 1rem;
            margin-bottom: 15px;
            text-align: center;
        }

        ul {
            list-style: none;
            padding: 0;

            li {
                padding: 5px 30px 5px 30px;
                color: #666;
                position: relative;
                font-size: 0.9rem;

                &:before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #4CAF50;
                    font-weight: bold;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .s-homeview-section {
        padding: 20px;

        .s-homeview-section-title {
            font-size: 2rem;
        }

        .s-homeview-section-subtitle {
            font-size: 1rem;
        }
    }

    .s-homeview-difficulty-section {
        padding: 25px;

        .s-homeview-difficulty-section-header h3 {
            font-size: 1.8rem;
        }
    }

    .s-homeview-difficulty-cards {
        grid-template-columns: 1fr;
    }

    .s-homeview-difficulty-card {
        flex-direction: column;
        text-align: center;

        .s-homeview-difficulty-icon {
            margin: 0 auto;
        }

        .s-homeview-difficulty-stats {
            justify-content: center;
        }
    }

    .s-start-button {
        width: 100%;
        padding: 15px;
    }
}
</style>