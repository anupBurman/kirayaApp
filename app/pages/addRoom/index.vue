<template>
    <div class="container-fluid  vh-100 px-0"
        style="background-image: url('/images/yyy.jpg');  background-size: cover; background-blend-mode: overlay;">
        <!-- <h2 class="pb-4"><span>Add Building Or House</span></h2> -->
        <div class="row p-4 ">
            <div class="col-lg-4"></div>
            <div class="col-lg-4 text-start p-5">
                <div class="text-center">
                    <span class="loader" v-if="loader"></span>
                </div>

                <form @change="">
                    <!-- 3 -->
                    <div class="form-group">
                        <label for="property"> Select Property First to Add Room </label>
                        <select class="form-select" v-model="propertyId" name="property">
                            <option value=""> Select Your Property  *</option>
                            <option v-for="item in response" :value="item.id" :key="item.id">
                                {{ item.building_name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <NuxtLink :to="/addRoom/ + propertyId">
                            <button v-if="propertyId" type="button" class="button-72 btn btn-default w-100"
                                role="button">
                                Add Room
                            </button>
                        </NuxtLink>
                    </div>
                </form>
            </div>
            <div class="col-lg-4">
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Swal from 'sweetalert2';
import PropId from './[propId].vue';

// Router setup
const router = useRouter();

// State reactive variables (replacing data())

const buildingName = ref('');
const noProp = ref('');
const response = ref([]);
const loader = ref(true);

const imagePath = ref('');
const propertyId = ref();
const usermail = ref('');

// Methods
const getData = async () => {
    loader.value = true;
    try {
        // $fetch automatically parses JSON and throws errors for non-2xx responses
        const data = await $fetch('http://localhost/rental_app/api/my_properties.php', {
            method: 'POST',
            body: {
                user_email: usermail.value,
            }
        });

        // If execution reaches here, the response status was 2xx
        loader.value = false;
        response.value = data;
        noProp.value = data.length === 0 ? true : '';
        console.log(data)

    } catch (error) {
        loader.value = false; // Ensures loader turns off on failure
        console.error("Something went wrong:", error);
        // router.push({ path: '/error_page/' });
    }
};


// Lifecycle Hooks (replacing mounted())
onMounted(() => {
    const localUser = localStorage.getItem("userinfo");
    if (localUser) {
        usermail.value = JSON.parse(localUser);
    }
    getData();
});
</script>


<style>
.container-fluid {
    box-sizing: border-box;
    overflow: hidden;
}
</style>