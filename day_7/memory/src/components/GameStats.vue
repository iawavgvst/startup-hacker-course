<template>
    <div class="s-gamestats">
        <div class="s-gamestats-grid">
            <div class="s-gamestats-item">
                <div class="s-gamestats-item_stat-label">Уровень сложности:</div>
                <div class="s-gamestats-item_stat-value">{{ difficultyLabel }}</div>
            </div>

            <div class="s-gamestats-item">
                <div class="s-gamestats-item_stat-label">Ходы:</div>
                <div class="s-gamestats-item_stat-value">{{ moves }}</div>
            </div>

            <div class="s-gamestats-item">
                <div class="s-gamestats-item_stat-label">Карточек осталось:</div>
                <div class="s-gamestats-item_stat-value">{{ remainingCards }} / {{ totalCards }}</div>
            </div>

            <div class="s-gamestats-item">
                <div class="s-gamestats-item_stat-label">Время:</div>
                <div class="s-gamestats-item_stat-value">{{ formattedTime }}</div>
            </div>
        </div>

        <div class="s-gamestats-status" v-if="gameFinished">
            <div class="s-gamestats_status-message success" v-if="remainingCards === 0">
                Поздравляем! Ты завершил игру!
            </div>
            <div class="s-gamestats-score-display" v-if="score">
                <div class="s-gamestats_score-label">Твоя оценка:</div>
                <div class="s-gamestats_score-value">{{ score }}</div>
            </div>
        </div>
      </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    moves: {
        type: Number,
        default: 0
    },
    remainingCards: {
        type: Number,
        default: 0
    },
    totalCards: {
        type: Number,
        default: 0
    },
    difficulty: {
        type: String,
        default: 'easy'
    },
    gameTime: {
        type: Number,
        default: 0
    },
    gameStarted: {
        type: Boolean,
        default: false
    },
    gameFinished: {
        type: Boolean,
        default: false
    },
    score: {
        type: String,
        default: ''
    }
});

const difficultyLabels = {
    easy: 'Легкий (12 карточек)',
    medium: 'Средний (24 карточки)',
    hard: 'Сложный (36 карточек)'
};

const difficultyLabel = computed(() => {
    return difficultyLabels[props.difficulty] || 'Легкий';
});

const formattedTime = computed(() => {
    const minutes = Math.floor(props.gameTime / 60);
    const seconds = props.gameTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});
</script>

<style scoped lang="scss">
.s-gamestats {
    background: #f8f9fa;
    border-radius: 15px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.s-gamestats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.s-gamestats-item {
    background: white;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .s-gamestats-item_stat-label {
        font-size: 1rem;
        color: #666;
        margin-bottom: 5px;
        font-weight: 500;
    }

    .s-gamestats-item_stat-value {
        font-size: 1rem;
        font-weight: bold;
        color: steelblue;
    }
}

.progress-container {
    background: white;
    border-radius: 10px;
    padding: 15px;
    margin-top: 20px;
    position: relative;
    overflow: hidden;

    .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: linear-gradient(90deg, steelblue 0%, darkslateblue 100%);
        opacity: 0.1;
        transition: width 0.5s ease;
    }

    .progress-text {
        position: relative;
        z-index: 1;
        font-weight: 500;
        color: #333;
    }
}

.s-gamestats-status {
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    text-align: center;

    .s-gamestats_status-message {
        font-size: 1.3rem;
        font-weight: bold;
        margin-bottom: 15px;

        &.success {
            color: #4CAF50;
        }
    }

    .s-gamestats-score-display {
        .s-gamestats_score-label {
            font-size: 1rem;
            color: #666;
            margin-bottom: 5px;
        }

        .s-gamestats_score-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: steelblue;
            margin-bottom: 5px;
        }
    }
}

@media (max-width: 768px) {
    .s-gamestats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .s-gamestats-item .s-gamestats-item_stat-value {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .s-gamestats-grid {
        grid-template-columns: 1fr;
    }
}
</style>