<template>
    <div class="s-modal-overlay" @click.self="$emit('close')">
        <div class="s-modal-overlay-content">
            <h2>Запуск корабля: {{ ship.name }}</h2>
            <div class="s-modal-overlay-form-group">
                <label for="shipName">Название корабля:</label>
                <SInput
                    id="shipName"
                    v-model="shipName"
                    type="text"
                    placeholder="Введите название корабля"
                    class="s-modal-overlay-name-input"
                    @keyup.enter="handleLaunch"
                    ref="nameInput"
                />
            </div>
            <div class="s-modal-overlay-modal-actions">
                <SButton
                    class="btn cancel-btn"
                    @click="$emit('close')"
                >
                  Отмена
                </SButton>
                <SButton
                    class="btn launch-btn"
                    :disabled="!shipName.trim()"
                    @click="handleLaunch"
                >
                  Запустить
                </SButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { SButton, SInput } from 'startup-ui'

const props = defineProps({
    ship: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close', 'launch'])

const shipName = ref('')
const nameInput = ref(null)

onMounted(() => {
    nextTick(() => {
        if (nameInput.value && nameInput.value.$el) {
            const inputElement = nameInput.value.$el.querySelector('input') || nameInput.value.$el
            inputElement.focus()
        }
    })
})

function handleLaunch() {
    if (shipName.value.trim()) {
        emit('launch', shipName.value.trim())
        shipName.value = ''
    }
}
</script>

<style scoped>
.s-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.s-modal-overlay-content {
    background: linear-gradient(135deg, steelblue 0%, darkslateblue 100%);
    padding: 25px;
    border-radius: 15px;
    color: whitesmoke;
    min-width: 400px;
    border: 1px solid darkslateblue;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.s-modal-overlay-content h2 {
    margin: 0 0 20px 0;
    color: whitesmoke;
    text-align: center;
}

.s-modal-overlay-form-group {
    margin-bottom: 25px;
}

.s-modal-overlay-form-group label {
    display: block;
    margin-bottom: 8px;
    color: whitesmoke;
}

.s-modal-overlay-name-input {
    width: 100%;
    padding: 12px;
    border: 1px solid darkslateblue;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: whitesmoke;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
}

.s-modal-overlay-name-input:focus {
    border-color: darkslateblue;
    background: rgba(255, 255, 255, 0.15);
}

.s-modal-overlay-name-input::placeholder {
    color: ghostwhite;
}

.s-modal-overlay-modal-actions {
    display: flex;
    justify-content: space-between;
    gap: 15px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
}

.cancel-btn {
    background: #f44336;
    color: white;
}

.cancel-btn:hover {
    background: #d32f2f;
    transform: translateY(-2px);
}

.launch-btn {
    background: #4caf50;
    color: white;
}

.launch-btn:hover:not(:disabled) {
    background: #388e3c;
    transform: translateY(-2px);
}

.launch-btn:disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
}

@media (max-width: 768px) {
    .s-modal-overlay-content {
        min-width: 300px;
        margin: 20px;
    }
}
</style>
