<template>
    <div class="container-fluid template" style="background-image: url('/images/yyy.jpg');background-size: cover;">
        <h2> Add Tenent Detail In {{ buildingName }}  </h2>

        <div class="row pb-5">
            <form id="form" @submit.prevent="fetchData($event)">
                <div class="form-group ">
                    <input type="hidden" name="prop_name" class="form-control" placeholder="Enter Room/Flat Number">
                </div>
            </form>
            <div class="col-lg-3 col-md-3"></div>
            <div class="col-lg-6 col-md-6 text-start ">
                <div class="form p-4 ">
                    <div class="d_flex_between pb-2">
                        <h4 class="mb-0"> Add Tenent Details </h4>
                        <button class="btn bg_purple btn-sm px-3 round" v-if="goback" @click="goBack()">
                            <i class="fa fa-arrow-left text-light " aria-hidden="true"></i>
                        </button>
                    </div>
                    <!-- <button class="btn btn-dark btn-sm" v-if="goback" @click="goBack()"> back </button> -->
                    <form id="form2" @submit.prevent="postData($event)">
                        <div class="form_1 " v-show="!goback" id="form_1">
                            <div class="form-group d-none" v-for="(data, i) in response" :key="i">
                                <input type="text" name="prop_name" :value="buildingName" class="form-control"
                                    placeholder="Enter Room/Flat Number">
                                <input type="" name="prop_id" :value="rowId" class="form-control"
                                    placeholder="Enter Room/Flat Number">
                            </div>
                            <!-- 1 -->
                            <div class="form-group ">
                                <label class="d_flex_between">
                                    <span>
                                    </span>
                                    <i class="fa fa-info-circle px-2 info_btn" aria-hidden="true">
                                    </i>
                                    <span class="info_card alert alert-warning ">
                                        You can name the room/flat as per your choice example (R1, A1, Room-1, or
                                        Flat-1, Flat-2 etc.)
                                    </span>

                                </label>
                                <input type="text" v-model="roomNumber" name="room_id" class="form-control "
                                    placeholder="Enter Room/Flat Number *" required>
                            </div>
                            <div class="d_flex">
                                
                                <!-- 2 -->
                                <div class="form-group w-50 pe-lg-2 mx-0">
                                    <input type="text" v-model="TenentName" class="form-control " name="tenent_name"
                                        placeholder="Tenent Name *" required>
                                </div>
                                <!-- 3 -->
                                <div class="form-group w-50 px-0 mx-0">
                                    <input type="text" v-model="mobileNumber" class="form-control" maxlength="10"
                                        minlength="10" name="mob_number" placeholder="Tenent Mobile Number *" required>
                                </div>
                            </div>

                            <div class="d_flex">
                                <!-- 4 -->
                                <div class="form-group w-50 pe-lg-2 mx-0">
                                    <select class="form-select" name="gender" aria-label="Default select example">
                                        <option selected>Select Gender </option>
                                        <option value="male"> Male </option>
                                        <option value="female"> Female </option>
                                    </select>
                                </div>

                                <!-- 5 -->
                                <div class="form-group w-50 px-0 mx-0">
                                    <input type="number" class="form-control" name="total_members"
                                        placeholder="Total Members for This Room">
                                </div>
                            </div>

                            <div class="d_flex">
                                <!-- 6 -->
                                <div class="form-group w-50 pe-lg-2 mx-0">
                                    <select class="form-select " name="occupation" aria-label="Default select example">
                                        <option selected> Select Occupation </option>
                                        <option value="Govt.Job"> Govt. Job </option>
                                        <option value="Privet Job"> Privet Job </option>
                                        <option value="Bussiness"> Bussiness </option>
                                        <option value="Self Employed"> Self Employed </option>
                                    </select>
                                </div>
                                <!-- 7 -->
                                <div class="form-group w-50  mx-0">
                                    <select class="form-select" name="idproof_type" aria-label="Default select example"
                                        required>
                                        <option value="" selected>Select ID Type *</option>
                                        <option value="Adhaar"> Adhaar </option>
                                        <option value="Voter ID"> Voter ID </option>
                                        <option value="Driving License"> Driving License </option>
                                    </select>
                                </div>
                            </div>
                            <!-- 4 -->
                            <div class="form-group   mx-0">

                                <div class="form-group file_upload">
                                    <!-- Change ref="file" to ref="fileInput" to match the new script definition. -->
                                    <input type="file" ref="fileInput" accept="image/*" class="form-control w-75"
                                        @change="previewImg($event)">
                                    <div class="w-25 p-2 bg-light rounded">
                                        <img :src="img_url" class="preview_img" />
                                    </div>
                                </div>

                                <div v-if="requireMsg" class="alert py-1 alert-light text-danger  alert-dismissible">
                                    Input field with <span class="text-dark "> * </span> sign can't be empty. <br>
                                    File Uplod field can't be empty.
                                    <button type="button" class="btn-close" @click="requireMsg = false"
                                        aria-label="Close"></button>
                                </div>
                                <div class="form-group  ">
                                    <button type="button" class="btn bg_purple text-light  round " @click="nextShow()">
                                        Next &nbsp; <i class="fa fa-arrow-right text-light " aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>

                        </div>

                        <!-- =========== SECOND PART OF FORM ======== -->

                        <div class="form_2 " v-show="goback" id="form_2">
                            <!-- <h4> Rental Deatals </h4> -->
                            <div class="d_flex">
                                <div class="form-group w-50 pe-lg-2">
                                    <span>Enter Montly Rent Amount* </span>
                                    <input type="text" name="rent_amount" class="form-control"
                                        placeholder="Montly Rent Amount *" required>
                                </div>
                                <div class="form-group w-50 ">
                                    <span> Select Rent Mode </span>
                                    <select class="form-select" name="rent_mode" aria-label="Default select example"
                                        v-model="rentMode" required>
                                        <!-- <option selected>Select Rent Mode *</option> -->
                                        <option value="fixed date"> 1st day of the Month </option>
                                        <option value="date to date"> Date to Date </option>
                                    </select>
                                </div>
                            </div>

                            <div class="d_flex">
                                <div class="w-50 pe-lg-2">
                                    Enter Rent Start Date *
                                    <input type="date" name="rent_start_date" v-model="rentStartOn" class="form-control"
                                        placeholder="Start Date Of Rent" required @change="changeDate($event)">
                                </div>
                                <!-- <div class="form-group ">
                            <button type="button" class="btn btn-sm bg_purple text-white  round">Advance Rent</button>
                            <button type="button" class="btn btn-sm bg_purple text-white mx-2 round">None</button>
                        </div> -->
                                <div class="form-group w-50">
                                    <span> Enter if Any Due/Advance Payment </span>
                                    <input type="text" name="strt_due_amount" class="form-control"
                                        placeholder="Enter Due Amount">
                                </div>
                            </div>

                            <div class="d_flex">
                                <div class="w-50 pe-lg-2">
                                    <p class="mb-0"> Do You Take Any Security Deposit ? </p>


                                    <div class="form-group d-flex align-items-center">
                                        <input type="radio" id="s_amount1" name="s_amount" class="form-check-input "
                                            @click="securityAmt = false" /> <label for="s_amount1"
                                            class="px-2 me-2">No</label>
                                        <input type="radio" id="s_amount2" name="s_amount" class="form-check-input"
                                            checked @click="securityAmt = !false" /> <label for="s_amount2"
                                            class="px-2">Yes</label>
                                        <input type="number" name="security_amount" class="form-control "
                                            placeholder="Enter Sucurity Amount" v-if="securityAmt">
                                    </div>
                                </div>

                                <div class="w-50 ">
                                    <p class="mb-0"> Do You Take Montly maintenence Charges? </p>
                                    <div class="form-group d-flex align-items-center">
                                        <input type="radio" id="mentainChrg1" name="mentainChrg"
                                            class="form-check-input " checked @click="mentainChrg = ''" /> <label
                                            for="mentainChrg1" class="px-2 me-2">No</label>
                                        <input type="radio" id="mentainChrg2" name="mentainChrg"
                                            class="form-check-input " @click="mentainChrg = !''" /> <label
                                            for="mentainChrg2" class="px-2">Yes</label>
                                        <input type="number" name="mantenece_charge" class="form-control "
                                            placeholder="Enter Sucurity Amount" v-if="mentainChrg">

                                    </div>
                                </div>
                            </div>


                            <div class="d_flex">
                                <div class="w-50 pe-lg-2">
                                    <h4> Electricity </h4>
                                    <div class="form-group  px-0 mx-0">
                                        <select class="form-select" @change="billMode($event)" name="bijli_bill"
                                            aria-label="Default select example" required>
                                            <option value="" selected>Select Rent Mode *</option>
                                            <option value="charge per unit"> Charges per Unit </option>
                                            <option value="govt billing"> Govt. Meter Billing </option>
                                            <option value="fixed monthly"> Fixed Monthly </option>
                                            <option value="none"> None (Included in Rent) </option>
                                        </select>
                                    </div>
                                    <!-- electricity -->
                                    <div v-if="perUnit">
                                        <div class="d_flex_between">
                                            <div class="form-group w-50 ">
                                                <input type="number" minlength="1" maxlength="2" name="e_per_unit"
                                                    class="form-control" placeholder="Per Unit Price">
                                            </div>
                                            <div class="form-group w-50">
                                                <input type="date" name="e_redaing_date" class="form-control"
                                                    placeholder="Enter Reading Date">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="d_flex_between">
                                                <span>
                                                </span>
                                                <i class="fa fa-info-circle px-2 info_btn" aria-hidden="true">
                                                </i>
                                                <span class="info_card alert alert-warning ">
                                                    Meter reading at the time the tenant starts living
                                                </span>
                                            </label>
                                            <input type="number" name="bijli_reading" class="form-control"
                                                placeholder="Enter Last Reading in Units">
                                        </div>

                                    </div>


                                    <div class="d-flex" v-if="govBill">
                                        <!-- <div class="form-group">
                                <input type="text" name="security_amount" class="form-control"
                                    placeholder="Enter Sucurity Amount">
                            </div>

                            <div class="form-group w-50">
                                <input type="date" name="Redaing_date" class="form-control"
                                    placeholder="Enter Sucurity Amount">
                            </div> -->
                                    </div>

                                    <div v-if="fixedMonthly">
                                        <div class="form-group">
                                            <input type="number" name="e_fixed_monthly" class="form-control"
                                                placeholder="Enter Fixed Monthly Amount">
                                        </div>
                                    </div>
                                </div>

                                <div class="w-50">
                                    <h4> Water Bill</h4>
                                    <div class="form-group  px-0 mx-0">
                                        <select class="form-select" @change="waterBill($event)" name="water_bill"
                                            aria-label="Default select example">
                                            <option selected>Select Rent Mode</option>
                                            <option value="charge per unit"> Charges per Unit </option>
                                            <option value="govt billing"> Govt. Meter Billing </option>
                                            <option value="fixed monthly"> Fixed Monthly </option>
                                            <option value="none"> None (Included in Rent) </option>
                                        </select>
                                    </div>

                                    <!-- water -->
                                    <div v-if="perUnit2">
                                        <div class="d_flex_between ">
                                            <div class="form-group w-50">
                                                <input type="number" minlength="1" maxlength="2" name="w_per_unit"
                                                    class="form-control" placeholder="Per Unit Price">
                                            </div>
                                            <div class="form-group w-50">
                                                <input type="date" name="w_redaing_date" class="form-control"
                                                    placeholder="Enter Date ">
                                            </div>
                                        </div>
                                        <div class="form-group ">
                                            <input type="number" name="water_reading" class="form-control"
                                                placeholder="Enter Water Reading">
                                        </div>
                                    </div>


                                    <div class="d-flex" v-if="govBill2">
                                        <!-- <div class="form-group">
                                <input type="number" name="security_amount" class="form-control"
                                    placeholder="Enter Sucurity Amount">
                            </div>
                            <div class="form-group w-50">
                                <input type="date" name="Redaing_date" class="form-control"
                                    placeholder="Enter Sucurity Amount">
                            </div> -->
                                    </div>
                                    <div v-if="fixedMonthly2">
                                        <div class="form-group">
                                            <input type="number" name="w_fixed_monthly" class="form-control"
                                                placeholder="Enter Amount">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group py-2">
                                <button type="button" class="btn  bg_purple text-white  w-100" v-show="loader2">
                                    <span class="loader-sm"></span>
                                </button>
                                <button type="submit" name="submit" class="btn bg_purple text-light  form-control"
                                    v-show="submitBtn">
                                    Submit
                                </button>
                            </div>
                            <div class="form-group ">
                                <span class="loader-absolute" v-if="loader"></span>
                            </div>
                            <!-- <div v-html="uploadedImage"></div> -->
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-3 col-md-3">
                <!-- <h6 class="alert alert-success" v-if="successMsg"> Updated Successfully !! </h6>
                <span class="loader" v-if="loader"></span> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
// import PropId from '../myProperties/[propId].vue';
// Nuxt router composable
const router = useRouter();
const route = useRoute();

// State properties (refs)
const response = ref([]);
const roomNumber = ref('');
const TenentName = ref('');
const mobileNumber = ref('');
const gender = ref('');
const totalMemeber = ref(1);
const idType = ref('');
const file = ref('');
const buildingName = ref('');
const rentStartOn = ref('');
const rentMode = ref('');
const loader = ref('');
const rowId = ref('');
const securityAmt = ref(true);
const mentainChrg = ref('');
const perUnit = ref('');
const govBill = ref('');
const fixedMonthly = ref('');
const noElectricity = ref('');
const perUnit2 = ref('');
const govBill2 = ref('');
const fixedMonthly2 = ref('');
const goback = ref('');
const requireMsg = ref('');
const img_url = ref(null);
const loader2 = ref('');
const submitBtn = ref(true);

// Template Ref for file input
const fileInput = ref(null);



// Methods
const changeDate = (e) => {
  if (rentMode.value === 'fixed date') {
    let dt = e.target.value;
    let last2 = dt.slice(-2);
    if (last2 !== '01') {
      Swal.fire({
        icon: 'error',
        text: 'Please select 1st Date of the month Because Your Rent mode is "1st day of the month"'
      });
      rentStartOn.value = '';
    } else {
      console.log(last2, rentMode.value);
    }
  }
};

const billMode = (e) => {
  let bilValue = e.target.value;
  if (bilValue === 'charge per unit') {
    perUnit.value = true;
    govBill.value = '';
    fixedMonthly.value = '';
  } else if (bilValue === 'govt billing') {
    govBill.value = true;
    perUnit.value = '';
    fixedMonthly.value = '';
  } else if (bilValue === 'fixed monthly') {
    fixedMonthly.value = true;
    perUnit.value = '';
    govBill.value = '';
  } else if (bilValue === 'none') {
    fixedMonthly.value = '';
    perUnit.value = '';
    govBill.value = '';
    noElectricity.value = true;
  } else {
    fixedMonthly.value = '';
    perUnit.value = '';
    govBill.value = '';
  }
};

const waterBill = (e) => {
  let bilValue2 = e.target.value;
  if (bilValue2 === 'charge per unit') {
    perUnit2.value = true;
    govBill2.value = '';
    fixedMonthly2.value = '';
  } else if (bilValue2 === 'govt billing') {
    govBill2.value = true;
    perUnit2.value = '';
    fixedMonthly2.value = '';
  } else if (bilValue2 === 'fixed monthly') {
    fixedMonthly2.value = true;
    perUnit2.value = '';
    govBill2.value = '';
  } else {
    fixedMonthly2.value = '';
    perUnit2.value = '';
    govBill2.value = '';
  }
};

const nextShow = () => {
  if (TenentName.value !== '') {
    goback.value = true;
  } else {
    requireMsg.value = true;
  }
};

const goBack = () => {
  goback.value = false;
};

const previewImg = (e) => {
  const selectedFile = e.target.files[0];
//   img_url.value = URL.createObjectURL(selectedFile);
   if (selectedFile) {
    img_url.value = URL.createObjectURL(selectedFile);
  }
};

const fetchData = async () => {
  rowId.value = route.params.slug;
  
  try {
    const res = await $fetch(`http://localhost/rental_app/api/my_properties_detail.php?id=`+ rowId.value , {
      method: 'POST',
      body: {
        id: rowId.value,
        building_name: buildingName.value,
      }
    });

    response.value = res;
    if (response.value && response.value[0]) {
      buildingName.value = response.value[0].building_name;
    }
  } catch (error) {
    console.error("something went wrong", error);
  }
};

const postData = async (e) => {
  console.log(e);
  loader2.value = true;
  submitBtn.value = '';

  let form = document.getElementById('form2');
  file.value = fileInput.value.files[0];
  
  let formData = new FormData(form);
  formData.append('file', file.value);

  try {
    const res = await $fetch('http://localhost/rental_app/api/add_rooms.php', {
      method: 'POST',
      body: formData
      // Note: $fetch automatically sets the correct Content-Type for FormData, 
      // so manually defining headers for multipart/form-data is not needed.
    });

    loader2.value = '';
    submitBtn.value = true;

    if (res.image === '') {
      Swal.fire({
        text: res.message,
      });
    } else {
      fileInput.value.value = '';
      Swal.fire({
        icon: "success",
        text: res.message,
        timer: 2000
      }).then(() => {
        router.push('propertyDetails');
      });
    }
  } catch (error) {
    loader2.value = '';
    submitBtn.value = true;
    console.error(error);
  }finally{
    loader2.value = false;

  }
};

// Mounted lifecycle hook
onMounted(() => {
    
  fetchData();
  let form2 = document.getElementById('form_2');
  if (form2) form2.style.display = 'none';
});
</script>

<style>
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
