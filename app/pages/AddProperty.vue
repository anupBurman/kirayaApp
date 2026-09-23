<template>
  <div class="container-fluid template" style="background-image: url('/images/yyy.jpg'); background-size: cover; background-blend-mode: overlay;">
    <h2 class="pb-4"><span>Add Building Or House</span></h2>

    <div class="row px-lg-5 rounded add_property">
      <div class="col-lg-4 px-0 rounded"></div>

      <div class="col-lg-4 text-start">
        <div class="form p-4">
          <form id="form" @submit.prevent="btnUpload">
            <input type="hidden" name="user_email" class="form-control" v-model="usermail" required>
            
            <!-- 1 -->
            <div class="form-group">
              <input type="text" name="building_name" class="form-control" v-model="buildingName" placeholder="Property/Building Name" required>
            </div>

            <!-- 2 -->
            <div class="form-group">
              <input type="text" class="form-control" name="address" v-model="address" placeholder="Property Address*" required>
            </div>

            <!-- 3 -->
            <div class="form-group">
              <select class="form-select" name="prop_city" aria-label="Default select example" v-model="propCity">
                <option disabled value="">Select Property Location*</option>
                <option :value="data" v-for="(data, index) in states" :key="index">{{ data }}</option>
              </select>
            </div>

            <!-- 4 -->
            <div class="form-group file_upload">
              <!-- Notice: Changed ref to fileInput to match the Vue 3 Composition API setup -->
              <input type="file" ref="fileInput" accept="image/*" class="form-control w-75" @change="previewImg">
              <div class="w-25 p-2 bg-light rounded" v-if="img_url">
                <img :src="img_url" class="preview_img" alt="Preview" />
              </div>
            </div>

            <hr>
            <h5>Select Quantity of Rooms/Flats or Shops</h5>
            <div class="form-group file_upload">
              <div>
                <p class="my-0">Quantity of Flats/Rooms</p>
                <button type="button" class="btn btn-sm btn-secondary px-3" @click="decrement">-</button>
                <input type="text" name="room_countr" v-model="roomCountr" class="w-25 py-0 px-2 text-center" />
                <button type="button" class="btn btn-sm btn-dark px-3" @click="increment">+</button>
              </div>
              <div>
                <p class="my-0">Quantity of Shops</p>
                <button type="button" class="btn btn-sm btn-secondary px-3" @click="decrement2">-</button>
                <input type="text" name="shop_countr" v-model="shopCountr" class="w-25 py-0 px-2 text-center" />
                <button type="button" class="btn btn-sm btn-dark px-3" @click="increment2">+</button>
              </div>
            </div>

            <div class="form-group pt-3 mb-0">
              <button type="button" class="btn bg_purple text-light form-control" v-if="loader">
                <span class="loader-sm"></span>
              </button>
              <button type="submit" name="submit" class="btn bg_purple text-light form-control" v-show="submitBtn">
                Submit
              </button>
            </div>

            <!-- Dynamic uploaded image preview container -->
            <div v-if="uploadedImage" v-html="uploadedImage" class="mt-3"></div>
          </form>
        </div>
      </div>
      <div class="col-lg-4 px-0 rounded"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

// Configuration
const basepath = 'http://localhost/rental_app';
const router = useRouter()

// Reactive Variables
const buildingName = ref('')
const propCity = ref('')
const address = ref('')
const roomCountr = ref(0)
const shopCountr = ref(0)
const loader = ref(false)
const submitBtn = ref(true)
const uploadedImage = ref('')
const img_url = ref(null)
const usermail = ref('')

const states = ref([
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujrat',
  'Hayana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamilnadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal'
])

// Template Ref mapping to HTML input element
const fileInput = ref(null)

// Counter Logic
const increment = () => roomCountr.value += 1
const decrement = () => {
  if (roomCountr.value > 0) roomCountr.value -= 1
}

const increment2 = () => shopCountr.value += 1
const decrement2 = () => {
  if (shopCountr.value > 0) shopCountr.value -= 1
}

// Local File Preview Management
const previewImg = (e) => {
  const selectedFile = e.target.files[0]
  if (selectedFile) {
    img_url.value = URL.createObjectURL(selectedFile)
  }
}

// API Submit Action Handler
const btnUpload = async () => {
  submitBtn.value = false
  loader.value = true

  const formElement = document.getElementById('form')
  const formData = new FormData(formElement)

  // Extract file safe attachment from element reference
  if (fileInput.value && fileInput.value.files[0]) {
    formData.append('file', fileInput.value.files[0])
  }

  try {
    // Axios completely stripped out. $fetch auto-manages proper headers for FormData payload
    const data = await $fetch('http://localhost/rental_app/api/file_upload.php', {
      method: 'POST',
      body: formData
    })

    if (!data.image) {
      Swal.fire({
        icon: 'error',
        text: data.message
      })
      uploadedImage.value = ''
      submitBtn.value = true
      loader.value = false
    } else {
      Swal.fire({
        html: `${data.message}<br> You are redirected to My Properties`,
        icon: 'success'
      }).then(() => {
        router.push('/myProperties')
      })

      uploadedImage.value = `<img src="${basepath}${data.image}" class="img-thumbnail" width="300" />`
      
      // Clean up input value
      if (fileInput.value) fileInput.value.value = ''
    }
  } catch (error) {
    console.error('Upload error details:', error)
    Swal.fire({
      icon: 'error',
      text: 'Something went wrong during the file upload process.'
    })
    submitBtn.value = true
    loader.value = false
  }
}

// Lifecycle Hooks (Strict Client-Only Protection for Server-Side Rendered Applications)
onMounted(() => {
  const localUser = localStorage.getItem('userinfo')
  if (localUser) {
    usermail.value = JSON.parse(localUser)
  }
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
