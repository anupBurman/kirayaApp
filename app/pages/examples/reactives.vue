<script setup>
definePageMeta({
    layout: 'custom',
});
import { ref, reactive, computed, watch } from 'vue';

const name = ref('');
const cart = reactive({
    items: [],
    total: 0

})
const isBigcart = computed(() => cart.items.length >= 4
)

function addItems() {
    cart.items.push('item');
    cart.total += 10;
}
const Input = ref(['']);

function AddMore() {
    Input.value.push('')
}

</script>
<template>
    <div class="container text-center">
        <h1 class="mb-5"> 4 types to make reactive any data or value in nuxt </h1>
        <h5 class="text-success" v-if="isBigcart"> Ok You have a big cart </h5><br>
        <input v-model="name" type="text" placeholder="Name"> <br>
            <h5> Hello Mr/Mrs: {{ name }}</h5><br>

            <h5> {{ cart.items.length }} &nbsp; &nbsp; || &nbsp;&nbsp; {{ cart.total }} </h5>
            <button class="btn btn-dark" @click="addItems()"> Add Items</button>
            <hr>

            <div v-for="items, index in Input" :key="index">
                <label for="fname"> Input Field {{ index +1 }} </label>
                <input name="fname" v-model="Input[index]" class="mx-3" type="text">
            </div>
            <button class="btn btn-info" @click="AddMore()"> Add More </button>
            

    </div>
</template>