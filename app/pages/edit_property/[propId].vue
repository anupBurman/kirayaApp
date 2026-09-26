<template>
    <div class="container-fluid template"
        style="background-image: url('/images/yyy.jpg');  background-size: cover; background-blend-mode: overlay; ">
        <h2 class="pb-4"> 
            <span> Edit Property / </span> 
            <span class="btn bg_purple text-light rounded btn-sm py-0">{{ propId }}</span> 
        </h2>

        <div class="row px-lg-5 rounded add_property ">
            <div class="col-lg-4 px-0 rounded "></div>

            <div class="col-lg-4 text-start ">
                <span class="loader-loader" v-if="loader"></span>

                <div class="form p-4">
                    <form id="form" @submit.prevent="btnUpload($event)">
                        <div class="form-group d-none ">
                            <label> Property ID </label>
                            <!-- Vue 3 handles bound inputs securely -->
                            <input type="hidden" name="propId" class="form-control" :value="propId" required>
                        </div>

                        <!-- 1. Property Name -->
                        <div class="form-group ">
                            <label> Property Name </label>
                            <input type="text" name="building_name" class="form-control"
                                v-model="response.building_name" placeholder="Property/Building Name" required>
                        </div>

                        <!-- 2. Property Address -->
                        <div class="form-group ">
                            <label> Property Address </label>
                            <input type="text" class="form-control" name="address" v-model="response.address"
                                placeholder="Property Address*" required>
                        </div>

                        <!-- 3. State -->
                        <div class="form-group ">
                            <label> State </label>
                            <select class="form-select" name="prop_city" v-model="response.prop_city">
                                <option disabled value="">Select Property Location*</option>
                                <option :value="data" v-for="(data, index) in states" :key="index"> {{ data }} </option>
                            </select>
                        </div>

                        <!-- 4. Property Image Upload & Preview -->
                        <div class="form-group mb-1 ">
                            <label> Property/Building Image </label>
                        </div>

                        <div class="form-group file_upload ">
                            <!-- Added ref="fileInput" to link up with your Composition API script -->
                            <input type="file" ref="fileInput" accept="image/*" class="form-control w-75">
                            <div class="w-25 p-2 bg-light rounded" v-if="response.image_path">
                                <img :src="`http://localhost/rental_app/api/` + response.image_path" class="preview_img" alt="Property Preview" />
                            </div>
                        </div>

                        <hr>
                        <h5> Select Quantity of Rooms/Flats or Shops </h5>
                        <div class="form-group file_upload ">
                            <div>
                                <p class="my-0"> Quantity of Flats/Rooms</p>
                                <button type="button" class="btn btn-sm btn-secondary px-3" @click="decrement()"> - </button>
                                <input type="text" name="room_countr" v-model="roomCountr" class="w-25 py-0 px-2 text-center" />
                                <button type="button" class="btn btn-sm btn-dark px-3" @click="increment()"> + </button>
                            </div>
                            <div>
                                <p class="my-0">Quantity of Shops</p>
                                <button type="button" class="btn btn-sm btn-secondary px-3" @click="decrement2()"> - </button>
                                <input type="text" name="shop_countr" v-model="shopCountr" class="w-25 py-0 px-2 text-center" />
                                <button type="button" class="btn btn-sm btn-dark px-3" @click="increment2()"> + </button>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="form-group py-3 mb-0">
                            <button type="button" class="btn bg_purple text-white w-100" v-show="loaderSmall">
                                <span class="loader-sm"></span>
                            </button>
                            <button type="submit" name="submit" class="btn bg_purple text-light form-control" v-show="submitBtn"> 
                                Submit
                            </button>
                        </div>
                        <div class="form-group mb-0">
                            <span class="loader" v-if="loader"></span>
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-lg-4 px-0 rounded "></div>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

// 1. Nuxt 3 Composables for Routing
const route = useRoute()
const router = useRouter()

// 2. Reactive State (Replaces data())
const response = ref([])
const propId = ref('')
const buildingName = ref('')
const propCity = ref('')
const postBody = ref('')
const selectedImg = ref('')
const roomCountr = ref(0)
const shopCountr = ref(0)
const loader = ref('')
const submitBtn = ref(true)
const loaderSmall = ref('')
const file = ref(null)
const uploadedImage = ref('')

// Template ref for the file input
const fileInput = ref(null)

const states = ref([
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujrat',
    'Hayana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamilnadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal'
])

// 3. Methods (Standard JavaScript functions)
const increment = () => {
    return (roomCountr.value += 1)
}

const decrement = () => {
    if (roomCountr.value > 0) {
        return (roomCountr.value -= 1)
    } else {
        roomCountr.value = 0
    }
}

const increment2 = () => {
    return (shopCountr.value += 1)
}

const decrement2 = () => {
    if (shopCountr.value > 0) {
        return (shopCountr.value -= 1)
    } else {
        shopCountr.value = 0
    }
}

// Fetch single property details
const getPropDetail = async () => {
    // Access route params using route.params
    propId.value = route.params.propId

    try {
        // $fetch implicitly throws an error if response status is not 2xx
        const data = await $fetch('http://localhost/rental_app/api/get_single_property.php', {
            method: 'POST',
            body: {
                prop_id: propId.value,
            }
        })

        // Nuxt automatically parses JSON, no need for .data wrapper
        response.value = data[0]
        roomCountr.value = parseInt(response.value.room_countr)
        shopCountr.value = parseInt(response.value.shop_countr)

    } catch (error) {
        console.error('Something went wrong:', error)
    }
}

// Upload/Submit Form Data
const btnUpload = async (e) => {
    submitBtn.value = ''
    loaderSmall.value = true

    let form = document.getElementById('form')

    // Extract file from template ref
    if (fileInput.value && fileInput.value.files.length > 0) {
        file.value = fileInput.value.files[0]
    }

    let basepath = "http://localhost/rental_app/api/"
    let formData = new FormData(form)
    formData.append('file', file.value)

    try {
        // Use $fetch for posting Multipart/FormData
        const data = await $fetch('http://localhost/rental_app/api/edit_property.php', {
            method: 'POST',
            body: formData
            // Note: Nuxt automatically assigns 'multipart/form-data' header when FormData is provided as body
        })

        if (data.status === true) {
            Swal.fire({
                text: data.sql_massege,
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                router.push('/myProperties')
            })

            var image_html = "<img src='" + basepath + data.image + "' class='img-thumbnail' width='300' />"
            uploadedImage.value = image_html

            if (fileInput.value) {
                fileInput.value.value = ''
            }
        } else {
            Swal.fire({
                text: data.message,
                icon: "success",
                showConfirmButton: false,
                showCloseButton: true,
            })
            uploadedImage.value = ''
            submitBtn.value = true
            loaderSmall.value = ''
        }
    } catch (err) {
        console.error('Upload failed:', err)
        submitBtn.value = true
        loaderSmall.value = ''
    }
}

// 4. Lifecycle Hooks
onMounted(() => {
    getPropDetail()
})
</script>
<style scoped>
.preview_img {
    max-width: 80px;
    max-height: 65px;
    min-height: 60px;
}

.file_upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.file_upload input {
    padding: 1.6rem;
}
</style>
