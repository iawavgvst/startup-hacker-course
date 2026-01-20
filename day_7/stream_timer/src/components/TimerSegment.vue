<template>
    <div class="s-timesegment">
        <div class="s-timesegment-datawrapper">
            <div class="s-timesegment-number-wrapper">
                <transition-group name="flip" tag="div" class="s-timesegment-number-container">
                    <span
                        v-for="(digit, index) in formattedNumber"
                        :key="`${digit}-${index}`"
                        class="s-timesegment-number-digit"
                    >
                        {{ digit }}
                    </span>
                </transition-group>
            </div>
          <span class="s-timesegment-label">{{ label }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: String,
    number: {
        type: [String, Number],
        default: 0
    }
});

const formattedNumber = computed(() => {
    const num = Number(props.number);
    const formatted = num < 10 ? `0${num}` : num.toString();
    return formatted.split('');
});
</script>

<style scoped lang="scss">
.s-timesegment {
    &-datawrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    }

    &-number-wrapper {
        background-color: #2c3e50;
        padding: 12px 8px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 80px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
    }

    .s-timesegment-number-container {
        display: flex;
        gap: 2px;
    }

    .s-timesegment-number-digit {
        font-size: 45px;
        font-weight: bold;
        color: #ecf0f1;
        min-width: 25px;
        text-align: center;
        transition: all 0.3s ease;
    }

    .s-timesegment-label {
        font-size: 15px;
        color: #7f8c8d;
        font-weight: 500;
        text-transform: lowercase;
    }
}

.flip-enter-active,
.flip-leave-active {
    transition: all 0.6s ease-in-out;
    position: absolute;
}

.flip-enter-from {
    opacity: 0;
    transform: rotateX(90deg) translateY(20px);
}

.flip-enter-to {
    opacity: 1;
    transform: rotateX(0deg) translateY(0);
}

.flip-leave-from {
    opacity: 1;
    transform: rotateX(0deg) translateY(0);
}

.flip-leave-to {
    opacity: 0;
    transform: rotateX(-90deg) translateY(-20px);
}

.flip-move {
    transition: transform 0.6s ease-in-out;
}

@media (max-width: 768px) {
    .s-timesegment {
        &-number-wrapper {
            min-width: 60px;
            padding: 8px 6px;
        }

        .s-timesegment-number-digit {
            font-size: 28px;
            min-width: 18px;
        }

        .s-timesegment-label {
            font-size: 12px;
        }
    }
}

@media (max-width: 480px) {
    .timesegment {
        &-number-wrapper {
            min-width: 50px;
            padding: 6px 4px;
        }

        .s-timesegment-number-digit {
            font-size: 24px;
            min-width: 16px;
        }

        .s-timesegment-label {
            font-size: 11px;
        }
    }
}
</style>
