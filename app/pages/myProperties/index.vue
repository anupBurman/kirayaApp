<template>
    <div class="container-fluid template" style="background-image: url('/images/smoke_bg.jpg');background-size: cover;">
        <h2> My Properties </h2>

        <AddProperty v-if="noProp" />

           <div class="row py-4 d-flex justify-content-center">

            <div class="col-lg-3 text-start card_wrap pb-3" v-for="(data, index) in response" :key="index" >
                <NuxtLink :to="taburl + data.id">
                    <div class="card">
                        <img :src="basePath + data.image_path" class="card-img-top p-3" alt="image">
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
                                <NuxtLink :to="`/delete_property/` + data.id" @click="deleteTenent(data.id)" >
                                    <i class="fa fa-trash clr_orange pe-2" aria-hidden="true"></i> Delete Property
                                </NuxtLink>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="col-lg-8">
                <h6 class="alert alert-success" v-if="successMsg"> Updated Successfully !! </h6>
                <span class="loader" v-if="loader"></span>
            </div>
        </div>   
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Swal from 'sweetalert2';
// import AddProperty from './AddProperty.vue';

// Router setup
const router = useRouter();

// State reactive variables (replacing data())
const taburl = ref('/myProperties/');
const buildingName = ref('');
const propCity = ref('');
const propAddress = ref('');
const noProp = ref('');
const response = ref([]);
const loader = ref(false);
const successMsg = ref('');
const basePath = ref('http://localhost/rental_app/api/');
const imagePath = ref('');
const id = ref();
const usermail = ref('');

// Methods
const postData = async () => {
    loader.value = true;
    try {
        // $fetch automatically parses JSON and throws errors for non-2xx responses
        const data = await $fetch('http://localhost/rental_app/api/my_properties.php', {
            method: 'POST',
            body: {
                user_email: usermail.value,
                building_name: buildingName.value,
                prop_city: propCity.value,
                prop_address: propAddress.value,
                image_path: imagePath.value,
                id: id.value
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


// DELETE ALL TENENT DATA

const deleteTenent = async (propertyId) => {
  if (confirm('Do you really want to delete the property?')) {
    try {
     
      // $fetch parses JSON payloads automatically when passing an object to body
      const response = await $fetch('http://localhost/rental_app/api/delete_property.php', {
        method: 'POST',
        body: {
          propId: propertyId,
        }
      })

      // Nuxt $fetch resolves directly to the parsed data if successful (status 200-299)
      // If the backend returns standard HTTP success statuses:
      Swal.fire({
        icon: "success",
        text: 'Tenant Data Deleted',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        router.push('/myProperties')
      })

    } catch (error) {
      // If the request fails (status 4xx/5xx), $fetch automatically throws an error
      console.error("Something went wrong:", error)
      Swal.fire({
        icon: "error",
        text: 'Failed to delete the property.'
      })
    }
  }else{
    router.push('/myProperties')
  }
}
;

// Lifecycle Hooks (replacing mounted())
onMounted(() => {
    const localUser = localStorage.getItem("userinfo");
    if (localUser) {
        usermail.value = JSON.parse(localUser);
    }
    postData();
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
