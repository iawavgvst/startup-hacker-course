<template>
    <div class="s-gameboard" :class="`difficulty-${difficulty}`">
        <div
            v-for="card in cards"
            :key="card.id"
            class="s-gameboard-card-wrapper"
            @click="handleCardClick(card)"
            v-show="!card.isRemoved"
        >
        <Card
            :value="card.value"
            :is-flipped="card.isFlipped"
            :is-matched="card.isMatched"
            :is-clickable="!card.isMatched && !card.isFlipped && !gameFinished"
        />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, defineExpose } from 'vue';
import Card from './Card.vue';

const props = defineProps({
    difficulty: {
        type: String,
        default: 'easy'
    },
    gameStarted: {
        type: Boolean,
        default: false
    },
    gameFinished: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['card-click', 'game-start', 'game-finish', 'move-made'])

const cards = ref([])
const flippedCards = ref([])
const matchedPairs = ref(0)

const difficultyConfig = {
    easy: { pairs: 6, total: 12 },
    medium: { pairs: 12, total: 24 },
    hard: { pairs: 18, total: 36 }
}

const initializeGame = () => {
    const config = difficultyConfig[props.difficulty] || difficultyConfig.medium
    const numbers = Array.from({ length: config.pairs }, (_, i) => i + 1)
    const cardValues = [...numbers, ...numbers]

    const shuffled = shuffleArray(cardValues)

    cards.value = shuffled.map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
    }))

    flippedCards.value = []
    matchedPairs.value = 0
}

const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = shuffled[i]
        shuffled[i] = shuffled[j]
        shuffled[j] = temp
    }
    return shuffled
}

const handleCardClick = (clickedCard) => {
    if (clickedCard.isMatched || clickedCard.isFlipped || props.gameFinished) return

    emit('card-click')

    if (!props.gameStarted) {
      emit('game-start')
    }

    cards.value = cards.value.map(card =>
        card.id === clickedCard.id ? {...card, isFlipped: true} : card
    )

    flippedCards.value.push(clickedCard)

    if (flippedCards.value.length === 2) {
        emit('move-made')

        const [firstCard, secondCard] = flippedCards.value

        if (firstCard.value === secondCard.value) {
            setTimeout(() => {
                const matchedValue = firstCard.value

                cards.value = cards.value.filter(card => card.value !== matchedValue)

                matchedPairs.value++
                flippedCards.value = []

                const config = difficultyConfig[props.difficulty] || difficultyConfig.medium
                if (matchedPairs.value === config.pairs) {
                  emit('game-finish')
                }
            }, 500)
        } else {
            setTimeout(() => {
                cards.value = cards.value.map(card =>
                    flippedCards.value.some(fc => fc.id === card.id)
                    ? {...card, isFlipped: false}
                    : card
                )
                flippedCards.value = []
            }, 1000)
        }
    }
}

const getRemainingCards = () => {
    return cards.value.filter(card => !card.isMatched).length
}

const resetGame = () => {
    initializeGame()
}

defineExpose({
    getRemainingCards,
    resetGame
})

initializeGame()

watch(() => props.difficulty, initializeGame)
</script>

<style scoped lang="scss">
.s-gameboard {
    display: grid;
    gap: 15px;
    margin: 30px 0;
    justify-content: center;

    &.difficulty-easy {
        grid-template-columns: repeat(4, 1fr);
        max-width: 600px;
        margin: 30px auto;
    }

    &.difficulty-medium {
        grid-template-columns: repeat(6, 1fr);
        max-width: 900px;
        margin: 30px auto;
    }

    &.difficulty-hard {
        grid-template-columns: repeat(9, 1fr);
        max-width: 1200px;
        margin: 30px auto;
    }
}

.s-gameboard-card-wrapper {
    aspect-ratio: 3/4;
    perspective: 1000px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .s-gameboard {
        gap: 10px;

        &.difficulty-easy {
           grid-template-columns: repeat(3, 1fr);
           max-width: 400px;
        }

        &.difficulty-medium {
           grid-template-columns: repeat(4, 1fr);
           max-width: 500px;
        }

        &.difficulty-hard {
           grid-template-columns: repeat(6, 1fr);
           max-width: 600px;
        }
    }
}

@media (max-width: 480px) {
    .s-gameboard {
        gap: 8px;

        &.difficulty-easy {
            grid-template-columns: repeat(3, 1fr);
            max-width: 300px;
        }

        &.difficulty-medium {
            grid-template-columns: repeat(3, 1fr);
            max-width: 350px;
        }

        &.difficulty-hard {
            grid-template-columns: repeat(4, 1fr);
            max-width: 400px;
        }
    }
}
</style>
