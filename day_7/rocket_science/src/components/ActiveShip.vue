<template>
    <div
        class="s-active-ship"
        :style="shipStyle"
        @click="$emit('refuel', ship)"
    >
        <transition name="s-ship-fall" mode="out-in">
            <div v-if="ship.fuelPercentage > 0" class="s-active-ship-wrapper">
                <transition name="s-active-ship-wrapper-descend">
                    <div v-if="ship.fuelPercentage <= 10" class="s-low-fuel-warning">
                        <div class="s-warning-text">Низкий уровень топлива!</div>
                    </div>
                </transition>
                <img
                    :src="`/${ship.image}`"
                    :alt="ship.name"
                    class="s-active-ship-image"
                    :class="{ 'shaking': ship.fuelPercentage <= 10 }"
                />
                <div class="s-active-ship-fuel-indicator">
                    <div
                        class="s-active-ship-fuel-level"
                        :style="{ width: `${ship.fuelPercentage}%` }"
                        :class="{
                            'fuel-low': ship.fuelPercentage <= 30,
                            'fuel-critical': ship.fuelPercentage <= 10
                        }"
                    ></div>
                    <span class="s-active-ship-fuel-text">{{ Math.round(ship.fuelPercentage) }}%</span>
                </div>
                <div class="s-active-ship-name">{{ ship.name }}</div>
              </div>
            <div v-else class="s-crashed-ship">
                <img
                    :src="`/${ship.crashedImage}`"
                    :alt="`${ship.name} разбит`"
                    class="s-crashed-ship-image"
                />
                <div class="s-crashed-ship-text">Корабль разбит!</div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    ship: {
      type: Object,
      required: true
    }
})

defineEmits(['refuel'])

const shipStyle = computed(() => ({
    left: `${props.ship.x}%`,
    top: `${props.ship.y}%`,
    transform: `scale(${props.ship.fuelPercentage > 10 ? 1 : 0.8})`,
    opacity: props.ship.fuelPercentage > 0 ? 1 : 0.7,
    zIndex: props.ship.fuelPercentage <= 0 ? 1 : 2
}))
</script>

<style scoped>
.s-active-ship {
    position: absolute;
    transform-origin: center;
    transition: all 1s ease;
    cursor: pointer;
}

.s-active-ship-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.s-low-fuel-warning {
    position: absolute;
    top: -40px;
    background: rgba(255, 152, 0, 0.9);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
}

.s-warning-text {
    animation: warning-pulse 1s infinite;
}

.s-active-ship-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.s-active-ship-image.shaking {
    animation: shake 0.5s infinite;
}

.s-active-ship-fuel-indicator {
    width: 100px;
    height: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin-top: 5px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.s-active-ship-fuel-level {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    transition: width 1s linear;
}

.s-active-ship-fuel-level.fuel-low {
    background: linear-gradient(90deg, #ff9800, #ffb74d);
}

.s-active-ship-fuel-level.fuel-critical {
    background: linear-gradient(90deg, #f44336, #ef5350);
    animation: fuel-critical 1s infinite;
}

.s-active-ship-fuel-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.s-active-ship-name {
    margin-top: 5px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    background: rgba(0, 0, 0, 0.5);
    padding: 2px 8px;
    border-radius: 4px;
}

.s-crashed-ship {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.s-crashed-ship-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    filter: grayscale(0.7) brightness(0.7);
}

.s-crashed-ship-text {
    margin-top: 5px;
    color: #f44336;
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    background: rgba(0, 0, 0, 0.5);
    padding: 2px 8px;
    border-radius: 4px;
}

@keyframes warning-pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-2px);
    }
    75% {
        transform: translateX(2px);
    }
}

@keyframes fuel-critical {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

.s-ship-fall-enter-active .s-active-ship-wrapper,
.s-ship-fall-leave-active .s-active-ship-wrapper {
    transition: all 0.5s ease;
}

.s-ship-fall-enter-from .s-active-ship-wrapper {
    opacity: 0;
    transform: scale(0.5) translateY(-50px);
}

.s-ship-fall-leave-to .s-active-ship-wrapper {
    opacity: 0;
    transform: scale(0.5) translateY(50px);
}

.s-active-ship-wrapper-descend-enter-active .s-active-ship-wrapper,
.s-active-ship-wrapper-descend-leave-active .s-active-ship-wrapper {
    transition: all 0.3s ease;
}

.s-active-ship-wrapper-descend-enter-from .s-active-ship-wrapper {
    opacity: 0;
    transform: translateY(-20px);
}

.s-active-ship-wrapper-descend-leave-to .s-active-ship-wrapper {
    opacity: 0;
    transform: translateY(20px);
}
</style>
