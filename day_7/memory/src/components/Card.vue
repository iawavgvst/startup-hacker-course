<template>
    <div
        class="s-card"
        :class="{
        'card-flipped': isFlipped,
        'card-matched': isMatched,
        'card-clickable': isClickable,
        'card-invisible': !isVisible
        }"
        @click="handleClick"
    >
        <div class="s-card-inner">
            <div class="s-card-front">
                <div class="s-card-content">
                    <div class="s-card-value">{{ value }}</div>
                </div>
            </div>
            <div class="s-card-back">
                <div class="s-card-back-pattern"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    value: {
        type: Number,
        required: true
    },
    isFlipped: {
        type: Boolean,
        default: false
    },
    isMatched: {
        type: Boolean,
        default: false
    },
    isClickable: {
        type: Boolean,
        default: true
    },
    isVisible: {
      type: Boolean,
      default: true
    }
})

const emit = defineEmits(['click']);

const handleClick = () => {
    if (props.isClickable && props.isVisible) {
        emit('click');
    }
}
</script>

<style scoped lang="scss">
.s-card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
    cursor: pointer;

    &.card-flipped {
        transform: rotateY(180deg);
    }

    &.card-matched {
        opacity: 0.7;
        cursor: default;

        .s-card-front {
            background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
            border-color: #2E7D32;
        }
    }

    &.card-clickable {
        &:hover {
            .s-card-back {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
        }
    }
}

.s-card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
}

.s-card-front,
.s-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.s-card-front {
    background: linear-gradient(135deg, orange 0%, darkorange 100%);
    border: 3px solid darkorange;
    color: white;
    transform: rotateY(180deg);

    .s-card-content {
        text-align: center;
        padding: 20px;

        .s-card-value {
            font-size: 2.5rem;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
    }
}

.s-card-back {
    background: linear-gradient(135deg, orange 0%, darkorange 100%);
    border: 3px solid orangered;
    transform: rotateY(0deg);

    .s-card-back-pattern {
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
        );
        border-radius: 12px;
    }
}

@media (max-width: 768px) {
    .s-card-front {
        .s-card-content {
            padding: 10px;

            .s-card-value {
                font-size: 1.8rem;
            }
        }
    }
}

@media (max-width: 480px) {
    .s-card-front {
        .s-card-content {
            .s-card-value {
                font-size: 1.5rem;
            }
        }
    }
}
</style>
