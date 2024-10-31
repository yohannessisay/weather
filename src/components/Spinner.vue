<template>
    <div class="flex justify-center">
        <div :class="`${props.width} ${props.height} rounded-full animate-spin
                      border-2 border-solid border-teal-500 border-t-transparent`"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({ width: { type: String, default: "w-12" }, height: { type: String, default: "h-12" } })
</script>

<style scoped></style>