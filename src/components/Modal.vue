<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">

        <div class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

        <div class="relative bg-gray-800 border-2 border-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 z-10 transition-transform transform"
            :class="{ 'scale-100': isOpen, 'scale-95': !isOpen }">
            <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" @click="closeModal">
                &times;
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['close']);

function closeModal() {
    emit('close');
}
</script>

<style scoped>
.transition-transform {
    transition: transform 0.3s;
}
</style>