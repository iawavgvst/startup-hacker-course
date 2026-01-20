<template>
    <div class="s-timerheader">
        <transition name="fade" mode="out-in">
            <h1 v-if="!isLive" key="countdown">{{ title }}</h1>
            <div v-else key="live" class="s-timerheader-live_indicator">
                <span class="s-timerheader_live-dot"></span>
                <h1>В эфире</h1>
            </div>
        </transition>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    isLive: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
.s-timerheader {
    margin-bottom: 10px;
    text-align: center;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 35px;
        color: #2c3e50;
        margin: 0;
        font-weight: 600;
        letter-spacing: 0.5px;
    }
}

.s-timerheader-live_indicator {
    display: flex;
    align-items: center;
    gap: 12px;
    animation: pulse 2s infinite;

    h1 {
        color: #e74c3c;
        font-weight: 700;
    }
}

.s-timerheader_live-dot {
    width: 12px;
    height: 12px;
    background-color: #e74c3c;
    border-radius: 50%;
    display: inline-block;
    animation: blink 1.5s infinite;
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

@keyframes blink {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.5;
        transform: scale(0.9);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

/* Адаптивность */
@media (max-width: 768px) {
    .s-timerheader {
        margin-bottom: 20px;
        min-height: 50px;

        h1 {
            font-size: 24px;
        }
    }

    .s-timerheader_live-indicator {
        gap: 10px;
    }

    .s-timerheader_live-dot {
        width: 10px;
        height: 10px;
    }
}

@media (max-width: 480px) {
    .s-timerheader {
        margin-bottom: 15px;
        min-height: 40px;

        h1 {
            font-size: 20px;
        }
    }

    .s-timerheader_live-indicator {
        gap: 8px;
    }

    .s-timerheader_live-dot {
        width: 8px;
        height: 8px;
    }
}
</style>
