<template>
    <div class="app-wrapper">
        <div class="s-timerbox">
            <TimerHeader
                :title="timerTitle"
                :is-live="isLive"
            />
            <transition name="slide-fade" mode="out-in">
                <div v-if="!isLive" key="countdown" class="s-timerbox-display">
                    <TimerSegment
                        :label="getTimeUnitLabel(days, 'days')"
                        :number="days"
                    />
                    <TimerSegment
                        :label="getTimeUnitLabel(hours, 'hours')"
                        :number="hours"
                    />
                    <TimerSegment
                        :label="getTimeUnitLabel(minutes, 'minutes')"
                        :number="minutes"
                    />
                    <TimerSegment
                        :label="getTimeUnitLabel(seconds, 'seconds')"
                        :number="seconds"
                    />
                </div>
                <div v-else key="live" class="s-timerbox-live-message">
                    <h2>Поздравляем! Эфир начался.</h2>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import TimerHeader from "@/components/TimerHeader.vue";
import TimerSegment from "@/components/TimerSegment.vue";

// поставила 13 минут, можно будет сделать меньше для проверки - но вроде все ок
const streamTime = ref(new Date(Date.now() + 13 * 60 * 1000));

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

let timerInterval = null;

const isLive = computed(() => {
    return days.value === 0 && hours.value === 0 && minutes.value === 0 && seconds.value === 0;
});

const timerTitle = computed(() => {
    return isLive.value ? '' : 'Будем в эфире через:';
});

function pluralize(number, forms) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
}

function getTimeUnitLabel(value, unit) {
    const forms = {
        days: ['день', 'дня', 'дней'],
        hours: ['час', 'часа', 'часов'],
        minutes: ['минута', 'минуты', 'минут'],
        seconds: ['секунда', 'секунды', 'секунд']
    };
    return `${value} ${pluralize(value, forms[unit])}`;
}

function updateCountdown() {
    const now = new Date();
    const diff = streamTime.value.getTime() - now.getTime();

    if (diff <= 0) {
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
        return;
    }

    days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((diff % (1000 * 60)) / 1000);
}

onMounted(() => {
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});
</script>

<style scoped lang="scss">
.app-wrapper {
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
    padding: 20px;
}

.s-timerbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }

    &-display {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 30px 0;
        flex-wrap: wrap;
    }
}

.s-timerbox-live-message {
    text-align: center;
    padding: 40px 20px;
    animation: fadeIn 0.8s ease;

    h2 {
        font-size: 25px;
        color: red;
        margin: 0;
        font-weight: 500;
    }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.slide-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@media (max-width: 768px) {
    .app-wrapper {
        padding: 10px;
        height: auto;
        min-height: 100vh;
    }

    .s-timerbox {
        padding: 30px 20px;
        margin: 20px 0;

        &-display {
            gap: 15px;
            margin: 20px 0;
        }
    }

    .s-timerbox-live-message {
        padding: 30px 15px;

        h2 {
            font-size: 28px;
        }
    }
}

@media (max-width: 480px) {
    .s-timerbox {
        padding: 20px 15px;
        border-radius: 15px;

        &-display {
            gap: 10px;
        }
    }

    .s-timerbox-live-message {
        padding: 20px 10px;

        h2 {
            font-size: 24px;
        }
    }
}
</style>
