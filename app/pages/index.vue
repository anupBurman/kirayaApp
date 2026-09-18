<script setup>
import { useCounterStore } from '~/store/counter';
const store = useCounterStore();
useHead({
    title: 'Welcome to Home Page',
    meta: [
        { name: 'description', content: 'This is Home page description for kiraya app.' },
    ],
})

    
// onMounted(() =>{
// store.fetchUserProfile();
// })

</script>

<template>
    <h1>H1</h1>

    <!-- <MyProperties></MyProperties> -->



    <!-- <div>
        <h1> Add Building Or House </h1>
       
        <button class="btn btn-dark" @click="store.increment()"> Add Item </button>
        <button class="btn btn-dark ms-4" @click="store.randomizeCounter()"> Add Item Random </button>
        <button class btn btn-success ms-4 @click="store.getUser(e)"> Submit </button>
    </div>
    <ul>
        <li v-for="user in store.userdata" :key="user.user_id">
            id: {{ user.user_id }} email: {{ user.email }}
        </li>
    </ul>
    <ul>
        <li v-for="(profiles, index) in store.profile" :key="index">
            Name: {{ profiles.Name }} &nbsp; &nbsp;    Email: {{ profiles.email }}
        </li>
    </ul> -->

</template>