<template>
    <div
        class="s-ship-card"
        :class="{ 's-ship-card-disabled': disabled }"
        @click="handleClick"
    >
    <div class="s-ship-card" @click="$emit('select', ship)">
         <img
             :src="`/${ship.image}`"
             :alt="ship.name"
             class="s-ship-card-img-preview"
         />
         <div class="s-ship-card-info">
             <h3>{{ ship.name }}</h3>
             <p>Топливо: {{ ship.fuelCapacity }} л</p>
             <p>Скорость: {{ ship.speed }} км/с</p>
             <p>Расход: {{ ship.fuelConsumption }} л/с</p>
         </div>
         </div>
    </div>
</template>

<script setup>
defineProps({
    ship: {
        type: Object,
        required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
})

defineEmits(['select'])

function handleClick() {
    if (!props.disabled) {
        emit('select', props.ship)
    }
}
</script>

<style scoped>
.s-ship-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.s-ship-card:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: steelblue;
    transform: translateY(-2px);
}

.s-ship-card-img-preview {
    width: 100%;
    height: 60px;
    object-fit: contain;
    margin-bottom: 8px;
}

.s-ship-card-info h3 {
    margin: 0 0 5px 0;
    font-size: 0.9em;
    color: steelblue;
}

.s-ship-card-info p {
    margin: 2px 0;
    font-size: 0.8em;
    color: whitesmoke;
}
</style>
