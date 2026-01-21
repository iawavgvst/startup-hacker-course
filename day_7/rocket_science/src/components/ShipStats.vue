<template>
    <div class="s-stats-panel">
        <div class="s-stats-panel-item">
            <span class="s-stats-panel-item_label">Активных кораблей:</span>
            <span class="s-stats-panel-item_value">{{ activeShipsCount }}</span>
        </div>
        <div class="s-stats-panel-item">
            <span class="s-stats-panel-item_label">Разбитых кораблей:</span>
            <span class="s-stats-panel-item_value">{{ crashedShipsCount }}</span>
        </div>
        <div class="s-stats-panel-item">
            <span class="s-stats-panel-item_label">Всего запущено:</span>
            <span class="s-stats-panel-item_value">{{ totalLaunchedShips }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    activeShipsCount: {
        type: Number,
        required: true,
        default: 0
    },
    crashedShipsCount: {
        type: Number,
        required: true,
        default: 0
    },
    totalLaunchedShips: {
        type: Number,
        required: true,
        default: 0
    }
})
</script>

<style scoped>
.s-stats-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    padding: 15px;
    border-radius: 10px;
    color: white;
    z-index: 100;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.s-stats-panel-item {
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    min-width: 200px;
}

.s-stats-panel-item_label {
    color: whitesmoke;
    margin-right: 15px;
    font-size: 15px;
}

.s-stats-panel-item_value {
    color: steelblue;
    font-weight: bold;
    font-size: 1em;
}

@media (max-width: 768px) {
    .s-stats-panel {
        top: 10px;
        right: 10px;
        padding: 10px;
    }

    .s-stats-panel-item {
        min-width: 150px;
    }
}
</style>
