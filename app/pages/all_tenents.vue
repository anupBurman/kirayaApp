<template>
  <div class="container-fluid template" style="background-image: url('/images/smoke_bg.jpg'); background-size: cover;">
    <h2>Next Due Date Status</h2>
    <br>
    
    <div>
      <span class="loader" v-if="loader"></span>
    </div>

    <div class="container-fluid" style="overflow-x: auto;">
      <table class="table table-secondary">
        <thead>
          <tr class="table-dark">
            <th scope="col">Property</th>
            <th scope="col">Tenant Id</th>
            <th scope="col">Name</th>
            <th scope="col">Rent Amount</th>
            <th scope="col">Last Rent Received</th>
            <th scope="col">Next Due Date Status</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in response" :key="index">
            <td>{{ data.property }}</td>
            <td>{{ data.tenent_id }}</td>
            <td>{{ data.tenent_name }}</td>
            <td>{{ data.recieved_amount }}</td>
            <td>{{ data.start_date }}-{{ data.month }}-{{ data.start_year }}</td>
            <td>
              <span class="text-success" v-if="cMonth > data.month && cDate == data.start_date">
                <b>Month {{ parseInt(data.month) + 1 }} Completed</b>
              </span>
              <span v-else>Month {{ parseInt(data.month) + 1 }} Running...</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Hidden Form Container -->
      <div class="row d-none">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <div class="form p-4 mb-3 text-start">
            <form id="form" @submit.prevent="postData">
              <div class="form-group">
                <label>Enter Amount You received</label>
                <select class="form-select" v-model="month">
                  <option :value="mm" selected>{{ mm }}</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">November</option>
                  <option value="11">October</option>
                  <option value="12">December</option>
                </select>
                <input 
                  class="form-control" 
                  placeholder="Enter Amount *" 
                  type="text" 
                  v-model="userId"
                  required
                >
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-success">Send</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from '#app'

// Router lifecycle instance
const router = useRouter()

// Reactive State
const response = ref([])
const userId = ref('')
const month = ref('')
const mm = ref('')
const loader = ref(true)

const cDate = ref('')
const cMonth = ref('')
const cYear = ref('')

// Methods
const postData = async () => {
  try {
    // Replaced Axios with Nuxt 3 native $fetch
    const data = await $fetch('http://localhost/rental_app/api/all_tenents.php', {
      method: 'POST',
      body: {
        userId: userId.value,
        month: month.value
      }
    })

    loader.value = false
    response.value = data

    // Current date logic setup
    const d = new Date()
    cYear.value = d.getFullYear()
    cMonth.value = d.getMonth() + 1
    cDate.value = d.getDate()

  } catch (error) {
    console.error(error)
    // router.push('/error_page/')
  }
  finally{
    loader.value = false
  }
}

// Mounted hook (Only runs on the client side)
onMounted(() => {
  const d = new Date()
  const currentMonth = d.getMonth() + 1
  
  mm.value = currentMonth
  month.value = currentMonth

  // Safely get localstorage details strictly inside client-side execution
  const localUser = localStorage.getItem("userId")
  if (localUser) {
    userId.value = JSON.parse(localUser)
  }

  // Trigger data fetch
  postData()
})
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
  .d_flex {
    display: block;
  }

  .d_flex .w-50 {
    width: unset !important;
  }

  .info_card {
    margin-left: 16%;
  }

  .three_dots {
    margin-left: 82% !important;
  }
}
</style>
