<template>
    <input type="text" class="form-control alpha-num"  name="room_id" :value="inputValue" :maxlength="maxLength" @input="handleInput"
        placeholder="" />
</template>

<script setup>
import { ref, computed } from 'vue'
const inputValue = ref('')
// 1. Dynamically determine the max length based on the first character
const maxLength = computed(() => {
    const firstChar = inputValue.value.charAt(0)
    if (!firstChar) return 2 // Default max length when empty

    // If the first character is a digit, allow 2 characters. Otherwise, restrict to 1.
    return /^\d$/.test(firstChar) ? 2 : 1
})
// 2. Handle and sanitize the input in real-time
const handleInput = (event) => {
    let value = event.target.value

    // Strip out any characters that are not alphanumeric
    value = value.replace(/[^a-zA-Z0-9]/g, '')

    // Evaluate max length based on the sanitized first character
    const firstChar = value.charAt(0)
    const currentMax = /^\d$/.test(firstChar) ? 2 : 1

    // Enforce the dynamic slice/trim
    inputValue.value = value.slice(0, currentMax)

    // Keep the DOM input value in sync with the reactive state
    event.target.value = inputValue.value
}
</script>

<style scoped>
.alpha-num {
    text-transform: uppercase;
}
</style>
