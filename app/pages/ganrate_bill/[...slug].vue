<template>
  <div class="container-fuidte template"
    style="background-image: url('/images/yyy.jpg');  background-size: cover; background-blend-mode: overlay; ">
    <!-- <h2> My Properties Detail {{ rowId }} </h2> -->
    <!-- {{ output }} <br> {{ response2.month }} -->

    <!-- {{ response2 }} -->
    <div class="row py-4 d-flex justify-content-center">



      <div class="col-lg-4  ">
        <div v-if="successAlert" class="alert alert-success  alert-dismissible">
          {{ successMessage }}
          <button class="btn-close  " aria-label="close" @click="successAlert = false"></button>
        </div>
        <div v-if="errorAlert" class="alert alert-danger alert-dismissible">
          {{ errorMessage }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" @click="errorAlert = false"
            aria-label="Close">
          </button>
        </div>

        <!-- ======== RENT RECIEVED BLOCK START  ========= -->
        <div class="form p-4 mb-3 text-start">
          <form id="form" @submit.prevent="postBill">
            <div id="form_1">
              <h4 class="mb-0 text-center py-3"> Rent Recieve </h4>
              <div class="d_flex_between ">
                <h5 class="mb-0">{{ output.tenent_name }} /ID:{{ output.id }}</h5>

                <!--   WHEN USER GANERATE RECIEPT FIRST TIME THEN (this will show) -->
                <button type="button" class="btn btn-sm text-light btn-default bg_purple round  mx-lg-4 px-3"
                  v-if="response2.length == 0">
                  {{ dayy }}-{{ monthh }}-{{ Yearr }} <span style="color:aqua">To</span> {{ dayy }}-{{
                    parseInt(monthh) + 1 }}-{{
                    Yearr }}
                </button>

                <!--   WHEN USER ALREADY GANERATED RECIEPT ATLEAST ONCE THEN (this will show) -->
                <button type="button" class="btn btn-sm text-light btn-default bg_purple round  mx-lg-4 px-3" v-else>
                  {{ dayy }}-{{ parseInt(response2.month) + 1 }}-{{ Yearr }} <span style="color:aqua">To</span> {{ dayy
                  }}-{{
                    parseInt(response2.month) + 2 }}-{{
                    Yearr }}
                </button>
              </div>
              <hr>

              <div class="form-group d-none">
                <input class="form-control" type="text" name="row_id" v-model="rowId">
                <input class="form-control" type="text" v-model="tenentId">
              </div>


              <div class="form-group floating-group">
                <input class="form-control" placeholder="" type="text" v-model="amount" required>
                <label>
                  Enter Amount You recieved *
                </label>
              </div>


              <div class="form-group floating-group" v-if="response2.length == 0">
                
                <select class="form-select" v-model="rentCollectMonth" @change="checkMonth($event)" name="bijli_bill"
                  aria-label="Default select example" required>
                  <option value="" selected></option>
                  <option value="1"> January </option>
                  <option value="2"> Fabrury </option>
                  <option value="3"> March </option>
                  <option value="4"> April </option>
                  <option value="5"> May </option>
                  <option value="6"> June </option>
                  <option value="7"> July </option>
                  <option value="8"> August </option>
                  <option value="9"> Sepember </option>
                  <option value="10"> November </option>
                  <option value="11"> October </option>
                  <option value="12"> December </option>
                </select>
                <label>
                  Which Month's Rent You recieving
                </label>
              </div>
              <div class="form-group" v-else>
                <!-- Which Month's Rent You recieving -->
                <input class="form-control" readonly type="hidden" v-model="rentCollectMonth" required>
              </div>

              <!-- <div class="form-group ">
                                <label>
                                    Enter Date
                                </label>
                                <input class="form-control" type="date" v-model="date" required>
                            </div> -->

              <div class="form-group">
                
                <textarea class="form-control" placeholder="Write Naration (Optional) " v-model="naration"></textarea>
              </div>
              <div class="form-group " v-if="nextBtn">
                <button type="button" class="btn bg_purple text-light  round  " @click="nextShow()">
                  Next &nbsp; <i class="fa fa-arrow-right text-light " aria-hidden="true"></i>
                </button>
              </div>
            </div>



            <!-- ====== ELECTRICITY AND WATER BILL START (this will show when bill charge as per unit) ======= -->
            <div id="form_2">
              <div v-if="output.e_per_unit > 0">

                <button class="btn bg_purple btn-sm px-3 round" v-if="goback" @click="goBack()">
                  <i class="fa fa-arrow-left text-light " aria-hidden="true"></i>
                </button>

                <h4 class="mb-0 text-center py-3"> Electricity Bill </h4>
                <div>

                  <!-- this will show when zero entry in electric_water_bill table -->
                  <div class="form-group" v-if="readingField">
                    <label> Electricity Last Reading </label>
                    <h6 class="mb-0 text-danger"> </h6>
                    <input class="form-control" placeholder="Enter Last Reading" readonly type="number"
                      v-model="lastReading">
                  </div>

                  <!-- this will show when atleast 1 entry has been done in electric_water_bill table -->
                  <div class="form-group ">
                    <label> Electricity Last Reading2 </label>
                    <h6 class="mb-0 text-danger"> </h6>
                    <input class="form-control" placeholder="Enter Last Reading " type="number" v-model="lastReading2">
                  </div>
                  <div class="form-group">
                    <label> Electricity Current Reading </label>
                    <h6 class="mb-0 text-danger"> {{ error_msg }}</h6>
                    <input class="form-control" placeholder="Current Reading *" type="number" v-model="currentReading"
                      @keyup="getReading" required>
                  </div>
                  <div class="form-group">
                    <label>Reading Date </label>
                    <input class="form-control" type="date" v-model="date" Required>
                  </div>
                </div>


                <div class="px-0 mx-0 d-none">
                  <h5 class="mb-0"> Water Charge </h5>
                  <div class="form-group ">
                    <input class="form-control" type="text" name="row_id" v-model="rowId">
                    <input class="form-control" type="text" v-model="tenentId">
                  </div>
                  <div class="form-group">
                    <label> Water Current Reading </label>
                    <input class="form-control" placeholder="Current Reading" type="text" v-model="currentReading">
                  </div>
                  <div class="form-group">
                    <label>Reading Date </label>
                    <input class="form-control" type="date" v-model="date">
                  </div>
                </div>

                <div class="form-group d_flex_between ">
                  <h6 class="mb-0 "> units: <span class="text_bold"> {{ reslt_reading }}</span> </h6>
                  <h6 class="mb-0 "> Charges per unit: <span class="text_bold"> {{ output.e_per_unit
                  }}</span>
                  </h6>
                  <h6 class="mb-0"> Last Reading:
                    <span class="text_bold" v-if="readingField">{{ output.bijli_reading }}</span>
                    <span> {{ lastReading2 }} </span>
                  </h6>
                </div>
                <hr />
                <div class="form-group d_flex_between ">
                  <h6 class="mb-0 "> Monthly: <span class="text_bold"> </span> </h6>
                  <span class="text_bold"> {{ output.rent_amount }} </span>
                </div>
                <div class="form-group d_flex_between ">
                  <h6 class="mb-0 "> Electricity Bill: </h6>
                  <span class="text_bold"> {{ eBillAmount }} </span>
                </div>
                <hr>
                <div class="form-group d_flex_between ">
                  <h6 class="mb-0 ">Total: </h6>
                  <span class="text_bold"> {{ subTotal }} </span>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn default text-light bg_purple w-100"> Ganerate </button>
              </div>
            </div>

            <div class="form-group" v-if="submitt">
              <button type="submit" class="btn default text-light bg_purple w-100"> Ganerate </button>
            </div>



          </form>
        </div>

      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUpdate } from 'vue'
import Swal from 'sweetalert2'
import { useDataStore } from '@/store/preData';

const store = useDataStore();

// Access Nuxt 3 routing structures
const route = useRoute()
const router = useRouter()

// Reactive state equivalents of Option API data items
const successAlert = ref('')
const errorAlert = ref('')
const readingField = ref('')

const error_msg = ref('')
const output = ref({})
const rowId = ref('')
const tenentId = ref('')
const rentStartDate = ref('')
const userId = ref('')
const date = ref('')
const lastReading = ref('')
const lastReading2 = ref('')
const currentReading = ref('')
const reslt_reading = ref(0)
const eBillAmount = ref(0)
const subTotal = ref(0)

const amount = ref('')
const naration = ref('')
const rentCollectMonth = ref('')
const goback = ref(false)
const nextBtn = ref('')
const submitt = ref(true)

const response2 = ref([])
const month = ref('')

const dd = ref('')
const mm = ref('')
const yy = ref('')

const dayy = ref('')
const monthh = ref('')
const Yearr = ref('')
const loader = ref(false)
const requireMsg = ref(false)

// Fetch tenant overall profile context information
const RecievdAmount = async () => {
  try {
    const data = await $fetch(store.apiBasePath + 'tenent_all_details.php', {
      method: 'POST',
      body: { tenentId: tenentId.value }
    })

    if (data && data[0]) {
      lastReading.value = data[0].bijli_reading
      output.value = data[0]

      // Reformat incoming string from YYYY-MM-DD setup into separate values
      let inputDate = data[0].rent_start_date
      if (inputDate) {
        const [saal, mahina, din] = inputDate.split('-')
        dayy.value = din
        monthh.value = mahina
        Yearr.value = saal
      }
    }
  } catch (error) {
    console.error("something went wrong!", error)
  } finally {
    loader.value = false
  }
}

// Client event validation against duplicate rental periods
const checkMonth = (e) => {
  if (e.target.value == month.value) {
    alert('You have already rent recieved of this month Please select next month')
  }
}

// Process structural billing record upload to endpoint routing system
const postBill = async (e) => {
  e.preventDefault()

  if (!output.value.rent_start_date) return

  let Obj = new Date(output.value.rent_start_date)
  const startDate = Obj.getDate()
  const startYear = Obj.getFullYear()
  const startMonth = Obj.getMonth() + 1
  console.log(startDate, startYear, startMonth)

  try {
    const data = await $fetch(store.apiBasePath + 'recieve_payment.php', {
      method: 'POST',
      body: {
        property: rowId.value,
        userId: userId.value,
        room_num: output.value.room_id,
        tenent_id: tenentId.value,
        tenent_name: output.value.tenent_name,
        recieved_amount: amount.value,
        naration: naration.value,
        rentStartDate: startDate,
        startYear: startYear,
        lastPaidMonth: month.value,
        rentCollectMonth: rentCollectMonth.value,
        e_reading_date: date.value,
        current_reading: currentReading.value,
        last_reading: lastReading2.value
      }
    })

    if (data && data.status === true) {
      Swal.fire({
        icon: "success",
        text: data.sql_massege,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        // Nuxt route migration configuration parameter layout
        router.push('/tenent_profile/' + rowId.value + '/' + tenentId.value,
        )
      })
    } else {
      Swal.fire({
        text: data?.sql_massege || "Submission rejected by server boundary context.",
      })
    }
  } catch (error) {
    console.error("Transmission interruption encountered:", error)
  }
}

// Extract underlying historical balances on account profile
const getRentReceived = async () => {
  let d = new Date()
  let year = d.getFullYear()
  let monthVal = d.getMonth() + 1
  let day = d.getDate()
  let reverseData

  try {
    const data = await $fetch(store.apiBasePath + 'tenent_bill_detail.php', {
      method: 'POST',
      body: { id: tenentId.value }
    })

    if (data && data.status !== false) {
      reverseData = [...data].reverse()
      response2.value = reverseData[0]
      month.value = response2.value.month
      mm.value = monthVal
      dd.value = day
      yy.value = year
      rentCollectMonth.value = parseInt(response2.value.month) + 1

      // Previous month current_reading is this month's last Reading
      lastReading2.value = response2.value.current_reading
      readingField.value = reverseData.length > 0 ? false : true
    } else {
      console.log("something went wrong")
    }
  } catch (error) {
    console.error("Network fetching failed internally:", error)
  }
}

// Compute standard differential metrics for power usage tiers
const getReading = () => {
  let subTotalVal
  let cReading = currentReading.value
  let lastReadingVal = lastReading2.value

  if (cReading >= lastReadingVal) {
    reslt_reading.value = cReading - lastReading2.value
    eBillAmount.value = reslt_reading.value * output.value.e_per_unit
    subTotalVal = parseInt(output.value.rent_amount) + eBillAmount.value
    subTotal.value = subTotalVal
    error_msg.value = ""
  } else {
    eBillAmount.value = 0
    reslt_reading.value = 0
    error_msg.value = "Current Reading Should be Graeter Then Last Reading"
  }
}

// Visibility management methods dealing with traditional DOM workflows
const nextShow = () => {
  let perUnit = output.value.e_per_unit
  if (perUnit > 0) {
    document.getElementById('form_1').style.display = 'none'
    document.getElementById('form_2').style.display = 'block'
    goback.value = true
    submitt.value = true
  } else {
    requireMsg.value = true
  }
}

const goBack = () => {
  document.getElementById('form_1').style.display = ''
  document.getElementById('form_2').style.display = 'none'
  goback.value = false
}

// Lifecycle registration parameters replacing historical Options blocks
onMounted(() => {
  rowId.value = route.params.slug[0]
  tenentId.value = route.params.slug[1]
  rentStartDate.value = route.params.slug[2]



  RecievdAmount()
  getRentReceived()

  const form2 = document.getElementById('form_2')
  if (form2) form2.style.display = 'none'

  let localUser = localStorage.getItem("userId")
  if (localUser) {
    userId.value = JSON.parse(localUser)
  }
})

// Validation constraints tracked prior directly to document render trees
onBeforeUpdate(() => {
  if (output.value?.e_per_unit > 0) {
    submitt.value = false
    nextBtn.value = true
  } else {
    submitt.value = true
  }
})
</script>
