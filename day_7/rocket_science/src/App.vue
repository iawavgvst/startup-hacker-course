<template>
    <div class="s-app-container">
        <div class="s-space-background"></div>
        <SButton
            class="s-panel-toggle-btn"
            @click="toggleShipSelection"
            :class="{ 'panel-hidden': isShipSelectionHidden }"
            :title="isShipSelectionHidden ? 'Показать выбор кораблей' : 'Скрыть выбор кораблей'"
        >—
        </SButton>
        <ShipStats
            :active-ships-count="activeShipsCount"
            :crashed-ships-count="crashedShipsCount"
            :total-launched-ships="totalLaunchedShips"
        />
        <div
            class="s-ship-selection"
            :class="{ 's-ship-selection-hidden': isShipSelectionHidden }"
        >
            <div class="s-ship-selection-header">
                <h2>Выберите корабль для запуска</h2>
                <SButton
                    @click="toggleShipSelection"
                    :title="isShipSelectionHidden ? 'Показать' : 'Скрыть'"
                >
                </SButton>
            </div>
            <div class="s-ships-grid">
                <ShipCard
                    v-for="ship in availableShipTypes"
                    :key="ship.id"
                    :ship="ship"
                    :disabled="isShipDisabled(ship.id)"
                    @select="selectShip"
                />
            </div>
          </div>
        <ShipModal
            v-if="selectedShip"
            :ship="selectedShip"
            @close="closeModal"
            @launch="launchShip"
        />
        <div class="s-active-ships-container">
            <transition-group name="s-ships-list" tag="div">
                <ActiveShip
                    v-for="ship in activeShips"
                    :key="ship.id"
                    :ship="ship"
                    @refuel="refuelShip"
                />
            </transition-group>
        </div>
        <transition name="s-active-ship-refuel-animation">
            <div v-if="showRefuelEffect" class="s-active-ship-refuel-effect" :style="refuelEffectStyle">
                <div class="s-active-ship-fuel-particles">
                    <div v-for="n in 20" :key="n" class="s-active-ship-fuel-particle"></div>
                </div>
                <div class="s-active-ship-refuel-text">+100%</div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ShipStats from './components/ShipStats.vue'
import ShipCard from './components/ShipCard.vue'
import ShipModal from './components/ShipModal.vue'
import ActiveShip from './components/ActiveShip.vue'
import { SButton } from 'startup-ui'

const shipTypes = ref([
    {
        id: 1,
        name: 'Алая ведьма',
        image: 'ship.png',
        crashedImage: 'ship_crashed1.png',
        fuelCapacity: 1000,
        speed: 5,
        fuelConsumption: 2
    },
    {
        id: 2,
        name: 'Тор',
        image: 'ship1.png',
        crashedImage: 'ship_crashed2.png',
        fuelCapacity: 800,
        speed: 8,
        fuelConsumption: 4
    },
    {
        id: 3,
        name: 'Черная вдова',
        image: 'ship2.png',
        crashedImage: 'ship_crashed3.png',
        fuelCapacity: 2000,
        speed: 3,
        fuelConsumption: 1
    },
    {
        id: 4,
        name: 'Халк',
        image: 'ship3.png',
        crashedImage: 'ship_crashed4.png',
        fuelCapacity: 1500,
        speed: 6,
        fuelConsumption: 3
    },
    {
        id: 5,
        name: 'Железный человек',
        image: 'ship4.png',
        crashedImage: 'ship_crashed5.png',
        fuelCapacity: 3000,
        speed: 4,
        fuelConsumption: 2
    },
    {
        id: 6,
        name: 'Соколиный глаз',
        image: 'ship5.png',
        crashedImage: 'ship_crashed1.png',
        fuelCapacity: 600,
        speed: 10,
        fuelConsumption: 6
    }
])

const selectedShip = ref(null)
const activeShips = ref([])
const showRefuelEffect = ref(false)
const refuelEffectStyle = ref({})
const isShipSelectionHidden = ref(false)

const totalLaunchedShips = ref(0)

const activeShipsCount = computed(() => {
    return activeShips.value.filter(ship => ship.fuelPercentage > 0).length
})

const crashedShipsCount = computed(() => {
    return activeShips.value.filter(ship => ship.fuelPercentage <= 0).length
})

const availableShipTypes = computed(() => {
    const usedTypeIds = new Set(activeShips.value.map(ship => ship.typeId))
    return shipTypes.value.filter(ship => !usedTypeIds.has(ship.id))
})

function isShipDisabled(shipId) {
    const usedTypeIds = new Set(activeShips.value.map(ship => ship.typeId))
    return usedTypeIds.has(shipId)
}

function toggleShipSelection() {
    isShipSelectionHidden.value = !isShipSelectionHidden.value
}

function selectShip(ship) {
    selectedShip.value = ship
}

function closeModal() {
    selectedShip.value = null
}

function launchShip(shipName) {
    if (!shipName.trim() || !selectedShip.value) return

    if (shipName.trim().toLowerCase() !== selectedShip.value.name.toLowerCase()) {
        alert(`Ошибка! Вы выбрали корабль "${selectedShip.value.name}", но ввели имя "${shipName.trim()}".\nПожалуйста, введите правильное имя корабля.`)
        return
    }

    if (isShipDisabled(selectedShip.value.id)) {
        alert(`Корабль "${selectedShip.value.name}" уже запущен! Выберите другой корабль.`)
        closeModal()
        return
    }

    const newShip = {
        id: Date.now(),
        name: shipName.trim(),
        typeId: selectedShip.value.id,
        image: selectedShip.value.image,
        crashedImage: selectedShip.value.crashedImage,
        fuelCapacity: selectedShip.value.fuelCapacity,
        currentFuel: selectedShip.value.fuelCapacity,
        speed: selectedShip.value.speed,
        fuelConsumption: selectedShip.value.fuelConsumption,
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20,
        fuelPercentage: 100,
        isCrashed: false
    }

    activeShips.value.push(newShip)
    totalLaunchedShips.value++
    closeModal()
}

function refuelShip(ship) {
    if (ship.fuelPercentage <= 0) return

    showRefuelEffect.value = true
    refuelEffectStyle.value = {
        left: `${ship.x}%`,
        top: `${ship.y}%`
    }

    ship.currentFuel = ship.fuelCapacity
    ship.fuelPercentage = 100

    setTimeout(() => {
        showRefuelEffect.value = false
    }, 1000)
}

function updateShips() {
    activeShips.value.forEach(ship => {
        if (ship.fuelPercentage > 0) {
            // Расходуем топливо
            ship.currentFuel -= ship.fuelConsumption
            ship.fuelPercentage = (ship.currentFuel / ship.fuelCapacity) * 100

            if (ship.fuelPercentage <= 0) {
                ship.fuelPercentage = 0
                ship.isCrashed = true
            }

            const speedMultiplier = ship.fuelPercentage > 10 ? 1 : 0.3
            ship.x += (Math.random() - 0.5) * ship.speed * speedMultiplier
            ship.y += (Math.random() - 0.5) * ship.speed * speedMultiplier

            ship.x = Math.max(10, Math.min(90, ship.x))
            ship.y = Math.max(15, Math.min(85, ship.y))

            if (ship.x < 20) {
                ship.x += Math.random() * 2;
            }
        }
    })
}

let updateInterval

onMounted(() => {
    updateInterval = setInterval(updateShips, 1000)
})

onUnmounted(() => {
    if (updateInterval) {
        clearInterval(updateInterval)
    }
})
</script>

<style scoped>
.s-app-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.s-space-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/bg.jpg') center/cover no-repeat;
    z-index: 1;
    opacity: 0.8;
}

.s-panel-toggle-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: whitesmoke;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 150;
    box-shadow: 0 4px 15px rgba(79, 195, 247, 0.4);
    opacity: 0.5;
}

.s-panel-toggle-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(79, 195, 247, 0.6);
    opacity: 1;
}

.s-panel-toggle-btn:active {
    transform: scale(0.95);
}

.s-panel-toggle-btn.panel-hidden {
    background: linear-gradient(135deg, #666 0%, #444 100%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.s-panel-toggle-btn.panel-hidden:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
}

.s-ship-selection {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.85);
    padding: 30px;
    border-radius: 10px;
    color: white;
    z-index: 100;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    max-width: 400px;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform-origin: left center;
}

.s-ship-selection-hidden {
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
}

.s-ship-selection-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.s-ship-selection-header h2 {
    margin: 0;
    color: steelblue;
    font-size: 1.2em;
    justify-content: center;
}

.s-ships-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.s-active-ships-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.s-active-ship-refuel-effect {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.s-active-ship-fuel-particles {
    position: relative;
    width: 100px;
    height: 100px;
}

.s-active-ship-fuel-particle {
    position: absolute;
    width: 8px;
    height: 8px;
    background: steelblue;
    border-radius: 50%;
    animation: fuel-particle 1s ease-out forwards;
}

.s-active-ship-refuel-text {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: steelblue;
    font-size: 20px;
    font-weight: bold;
    animation: text-float 1s ease-out forwards;
    text-shadow: 0 0 10px rgba(79, 195, 247, 0.8);
}

@keyframes fuel-particle {
    0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.s-active-ship-fuel-particle {
    animation: fuel-particle 2s forwards;
}

@keyframes text-float {
    0% {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateX(-50%) translateY(-50px);
        opacity: 0;
    }
}

.s-ships-list-enter-active .s-active-ships-container,
.s-ships-list-leave-active .s-active-ships-container {
    transition: all 15s ease;
}

.s-ships-list-enter-from .s-active-ships-container {
    opacity: 1;
    transform: scale(0.3) translateY(50px);
}

.s-ships-list-leave-to .s-active-ships-container {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
}

.s-ships-list-move .s-active-ships-container {
    transition: transform 15s ease;
}

.s-active-ship-refuel-animation-enter-active .s-active-ships-container,
.s-active-ship-refuel-animation-leave-active .s-active-ships-container {
    transition: all 15s ease;
}

.s-active-ship-refuel-animation-enter-from .s-active-ships-container {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
}

.s-active-ship-refuel-animation-leave-to .s-active-ships-container {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
}

@media (max-width: 768px) {
    .s-ship-selection {
        max-width: 300px;
    }

    .s-ships-grid {
        grid-template-columns: 1fr;
    }

    .s-panel-toggle-btn {
        width: 45px;
        height: 45px;
        top: 15px;
        left: 15px;
    }
}

@media (max-width: 480px) {
    .s-ship-selection {
        max-width: 250px;
        padding: 15px;
    }

    .ship-selection-header h2 {
        font-size: 1em;
    }

    .s-panel-toggle-btn {
        width: 40px;
        height: 40px;
    }
}
</style>
