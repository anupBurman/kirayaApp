<template>
    <div class="container-fluid template" style="background-image: url('/images/smoke_bg.jpg');background-size: cover;">
        <h2> My Properties </h2>
        <!-- {{ store.response }} -->

        <!-- v-if="store.noProp" this condition is incuded below at onMounted block   -->
        <!-- <addProperty v-if="store.noProp" /> -->

        <div class="row py-4 d-flex justify-content-center">

            <div class="col-lg-3 text-start card_wrap pb-3" v-for="(data, index) in store.response" :key="index">
                <NuxtLink :to="taburl + data.id">
                    <div class="card">
                        <img :src="store.apiBasePath + data.image_path" class="card-img-top p-3" alt="image">
                        <div class="card-body pt-0">
                            <h5 class="card-title"> {{ data.building_name }} {{ data.id }} </h5>
                            <p class="card-text">{{ data.address }} {{ data.prop_city }} </p>
                        </div>
                    </div>
                </NuxtLink>


                <div class="three_dots dropdown px-1" id="edit_prop">
                    <i class="fa fa-list-ul" id="dropdownMenuButton1" data-bs-toggle="dropdown"></i>
                    <ul class="dropdown-menu bg_purple" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a class="dropdown-item" href="#">
                                <NuxtLink :to="`/edit_property/` + data.id">
                                    <i class="fa fa-pencil-square  pe-2" aria-hidden="true"></i> Edit Property
                                </NuxtLink>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">
                                <NuxtLink @click="deleteTenent(data.id)">
                                    <i class="fa fa-trash clr_orange pe-2" aria-hidden="true"></i> Delete Property
                                </NuxtLink>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="col-lg-8 text-center">
                <h6 class="alert alert-success" v-if="store.successMsg"> Updated Successfully !! </h6>
                <span class="loader" v-if="store.loader"></span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/store/preData';
const store = useDataStore();
import Swal from 'sweetalert2';
// import AddProperty from './AddProperty.vue';

const router = useRouter();
const taburl = ref('/myProperties/');

// Methods

// DELETE ALL TENENT DATA
const deleteTenent = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to get data of this Property again!",
        icon: "warning",
        showCancelButton: true,
        // confirmButtonColor: "#3085d6",
        // cancelButtonColor: "#474747",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await $fetch(store.apiBasePath + 'delete_property.php', {
                    method: 'POST',
                    body: { propId: propertyId }
                });
                Swal.fire({
                    icon: "success",
                    text: 'Property Data Deleted',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    router.push('/myProperties');
                });
            } catch (error) {
                console.error("Something went wrong:", error);
                Swal.fire({
                    icon: "error",
                    text: 'Failed to delete the property.'
                });
            }
        }
    });
};


// Lifecycle Hooks (replacing mounted())
onMounted(() => {
    store.noProp ? router.push('/addProperty') : store.noProp = '';
    // console.log(store.massage)
    // const localUser = localStorage.getItem("userinfo");
    // if (localUser) {
    //     usermail.value = JSON.parse(localUser);
    // }
    // postData();
    store.getProperties();
});
</script>

<style scoped>
.three_dots {
    position: absolute;
    margin-left: 20%;
    margin-top: -4rem;
}

.card_wrap .card {
    border-radius: 24px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    transition: all 0.5s;
}

.card_wrap .card img {
    border-radius: 30px;
    height: 300px;
}

.card_wrap .card:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    transition: all 0.5s;
}

@media (max-width:567px) {
    .info_card {
        margin-left: 16%;
    }

    .three_dots {
        margin-left: 82% !important;
    }
}
</style>
