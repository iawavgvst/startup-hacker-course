<template>
    <div class="dialog-form-overlay" v-if="show" @click.self="closeDialog">
        <div class="dialog-form-container">
            <div class="form-header">
                <slot name="title">
                    <h3>{{ title }}</h3>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
    show: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['close']);

const closeDialog = () => {
    emit('close');
};
</script>

<style scoped>
.dialog-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.dialog-form-container {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    animation: slideIn 0.3s ease;
}

.form-header {
    position: relative;
    justify-content: center;
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    border-radius: 12px 12px 0 0;
}
</style>