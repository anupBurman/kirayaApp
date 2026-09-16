<template>
    <h1> API call in Nuxt </h1>
     <div>
    <h2>User List</h2>
    
    <!-- Handle Loading and Error states -->
    <p v-if="isLoading">Loading users...</p>
    <p v-else-if="error" style="color: red;">{{ error }}</p>
    
    <!-- Display Data -->
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.uname }} - {{ user.email }}
      </li>
    </ul>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

// 1. Define reactive variables for your data, loading, and error states
const users = ref([])
const isLoading = ref(true)
const error = ref(null)

// 2. Define the API call function
const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost/rental_app/api/all_users.php')
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        users.value = await response.json()
        console.log(users.value)
    } catch (err) {
        error.value = err.message
    } finally {
        isLoading.value = false
    }
}

// 3. Trigger the API call when the component mounts
onMounted(() => {
    fetchUsers()
})

</script>