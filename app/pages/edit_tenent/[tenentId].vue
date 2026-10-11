<template>
    <div class="container-fluid template">

        <h2> Edit {{ responseData.prop_name }} / {{ rowId }} </h2>


        <div class="row px-lg-5 px-2 pb-5">
            <div class="form-group ">
                <span class="loader-absolute" v-if="loader"></span>
            </div>
            <!-- <div v-if="successAlert" class="alert alert-success alert-dismissible ">
                {{ successMessage }}
                <button type="button" class="btn-close" @click="successAlert = false" aria-label="Close"></button>
            </div> -->

            <form id="form" @submit.prevent="fetchData($event)">
                <div class="form-group ">
                    <input type="hidden" name="prop_name" class="form-control" placeholder="Enter Room/Flat Number">
                </div>
            </form>
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8 text-start form p-4 pb-0">
                <div class="d_flex_between pb-2">
                    <h4 class="mb-0"> Edit Tenent Details </h4>
                    <button class="btn bg_purple btn-sm px-3 round" v-if="goback" @click="goBack()">
                        <i class="fa fa-arrow-left text-light " aria-hidden="true"></i>
                    </button>
                </div>

                <form ref="form2Ref" @submit.prevent="postData($event)">
                    <div class="form_1 " id="form_1" v-show="!isForm2Visible">
                        <!-- <div class="form-group " v-for="(data, i) in response" :key="i">
                            <input type="text" name="prop_name" :value="buildingName" class="form-control"
                                placeholder="Enter Room/Flat Number">
                            <input type="" name="prop_id" :value="rowId" class="form-control"
                                placeholder="Enter Room/Flat Number">
                        </div> -->
                        <div class="row">
                            <div class="col-lg-6 form-group d-none ">
                                <span> Tenent ID </span>
                                <input type="text" v-model="tenent_id" name="tenent_id" class="form-control"
                                    placeholder="Enter Room/Flat Number" readonly>
                            </div>

                            <div class="col-lg-6 form-group floating-group ">
                                <!-- <span> Which You Want to Give Rent *  </span> -->
                                <select class="form-select" v-model="tanency_type2" name="tanency_type"
                                    @change="getTenancy">
                                    <option hidden disabled selected></option>
                                    <option value="Room"> Room </option>
                                    <option value="Flat"> Flat </option>
                                    <option value="Shop"> Shop </option>
                                </select>
                                <label> Which You Want to Give Rent* </label>
                            </div>

                            <!-- 1 -->
                            <div class="col-lg-6 form-group floating-group">
                                <!-- <span> Room/Flat Number </span> -->
                                <input type="text" class="form-control alpha-num" name="room_id" v-model="roomNumber"
                                    :maxlength="maxLength" @input="handleInput" placeholder="1-99 or a-z" />
                                <!-- <input type="text" v-model="roomNumber" name="room_id" class="form-control"
                                    placeholder="Enter Room/Flat Number"> -->
                                <label> Room/Flat Number </label>
                            </div>

                            <!-- 2 -->
                            <div class="col-lg-6 form-group floating-group ">
                                <!-- <span> Tenent Name </span> -->
                                <input type="text" v-model="TenentName" class="form-control" name="tenent_name"
                                    placeholder="Tenent Name*" required>
                                <label> Tenent Name </label>
                            </div>

                            <!-- 3 -->
                            <div class="col-lg-6 form-group floating-group ">
                                <input type="text" v-model="mobileNumber" class="form-control" maxlength="10"
                                    minlength="10" name="mob_number" placeholder="Tenent Mobile Number *" required>
                                <label> Mobile Number </label>
                            </div>

                            <div class="col-lg-6 d-flex">
                                <!-- 4 -->
                                <div class="form-group floating-group  w-50 px-0 mx-0">
                                    <!-- <span> Gender </span> -->
                                    <select class="form-select" name="gender" aria-label="Default select example">
                                        <option selected> {{ responseData.gender }} </option>
                                        <option value="male"> Male </option>
                                        <option value="female"> Female </option>
                                    </select>
                                    <label>Gender </label>
                                </div>

                                <!-- 5 -->
                                <div class="form-group floating-group  w-50 px-0 mx-0" v-if="totMembr">
                                    <!-- <span> Total Members </span> -->
                                    <input type="number" min="0" v-model="totalMemeber" class="form-control" max="10"
                                        name="total_members" placeholder="Total Members">
                                    <label>Total Members</label>
                                </div>
                            </div>

                            <div class="col-lg-6 d-flex">
                                <!-- 6 -->
                                <div class="form-group floating-group  w-50 px-0 mx-0" v-if="totMembr">
                                    <!-- <span> Occupation </span> -->
                                    <select class="form-select " name="occupation" aria-label="Default select example">
                                        <option selected> {{ responseData.occupation }} </option>
                                        <option value="Govt.Job"> Govt. Job </option>
                                        <option value="Privet Job"> Privet Job </option>
                                        <option value="Bussiness"> Bussiness </option>
                                        <option value="Self Employed"> Self Employed </option>
                                    </select>
                                    <label>Occupation</label>
                                </div>
                                <!-- 7 -->
                                <div class=" form-group floating-group  w-50 px-0 mx-0">
                                    <!-- <span> ID Proof Type </span> -->
                                    <select class="form-select" name="idproof_type" aria-label="Default select example">
                                        <option selected> {{ responseData.idproof_type }} </option>
                                        <option value="Adhaar"> Adhaar </option>
                                        <option value="Voter ID"> Voter ID </option>
                                        <option value="Driving License"> Driving License </option>
                                    </select>
                                    <label>ID Proof Type</label>
                                </div>
                            </div>
                            <!-- 8 -->
                            <div class="form-group file_upload">
                                <!-- <label for="exampleInputEmail1">Title</label> -->
                                <input type="file" ref="fileInputRef" accept="image/*" class="form-control w-75 ">
                                <input type="text" :value="imagePath" name="tenentImg" class="form-control w-75 d-none">
                                <div class="w-25 p-2 bg-light rounded">
                                    <img :src="store.apiBasePath + responseData.image_path" class="preview_img" />
                                </div>
                            </div>


                            <div class="form-group ">
                                <button type="button" class="btn bg_purple text-light round " @click="nextShow()">
                                    Next <i class="ps-2 fa fa-arrow-right text-light"> </i>
                                </button>
                            </div>
                        </div>

                    </div>

                    <!-- =========== SECOND PART OF FORM ======== -->

                    <div class="form_2 " id="form_2" v-show="isForm2Visible">
                        <div class="row">
                            <!-- <h4> Rental Deatals </h4> -->
                            <div class="col-lg-6 form-group floating-group ">
                                <!-- <span> Monthly Rent Amount </span> -->
                                <input type="text" name="rent_amount" class="form-control" v-model="rentAmount"
                                    placeholder="">
                                <label>Monthly Rent Amount</label>
                            </div>
                            <div class="col-lg-6 form-group floating-group ">
                                <!-- <span> Rent Mode </span> -->
                                <select class="form-select" name="rent_mode" aria-label="Default select example">
                                    <option selected> {{ responseData.rent_mode }} </option>
                                    <option value="fixed date"> 5th day of the Month </option>
                                    <option value="date to date"> Date to Date </option>
                                </select>
                                <label>Rent Mode</label>
                            </div>

                            <!-- <div class="form-group ">
                            <input type="text" :value="response.rent_start_date"  name="rent_start_date" class="form-control"
                                placeholder="Start Date Of Rent" required >
                        </div> -->
                            <div class="col-lg-6 form-group floating-group ">
                                <!-- <span> Rent Start Date </span> -->
                                <input type="date" v-model="responseData.rent_start_date" name="rent_start_date"
                                    class="form-control" placeholder="">
                                <label>Rent Start Date</label>
                            </div>


                            <div class="col-lg-6 form-group floating-group">
                                <!-- <span> Enter if Any Due/Advance Payment </span> -->
                                <input type="text" name="strt_due_amount" class="form-control" placeholder="">
                                <label> Enter if Any Due/Advance Payment</label>
                            </div>
                            <p class="mb-0"> Do You Take Any Security Deposit ? </p>
                            <div class=" form-group  d-flex align-items-end">
                                <button type="button" class="btn btn-sm bg_purple text-white  round"
                                    @click="securityAmt = false">No</button>
                                <button type="button" class="btn btn-sm bg_purple text-white mx-2 round"
                                    @click="securityAmt = !false">Yes</button>

                                <input type="number" v-model="securityAmt" name="security_amount"
                                    class="form-control no-spinners " placeholder="Enter Sucurity Amount"
                                    v-if="securityAmt">
                            </div>
                            <p class="mb-0"> Do You Take Montly maintenence Charges? </p>
                            <div class="form-group d-flex align-items-end">
                                <button type="button" class="btn btn-sm bg_purple text-white  round"
                                    @click="mentainChrg = ''">No</button>
                                <button type="button" class="btn btn-sm bg_purple text-white mx-2 round"
                                    @click="mentainChrg = !''">Yes</button>
                                <input type="number" v-model="mentainChrg" name="mantenece_charge"
                                    class="form-control no-spinners " placeholder="Enter Monthly mantenece Charge"
                                    v-if="mentainChrg">
                            </div>

                            <hr>

                            <div class="col-lg-6">
                                <h4> Electricity </h4>
                                <div class=" form-group  px-0 mx-0">
                                    <select class="form-select" @change="billMode($event)" name="bijli_bill"
                                        aria-label="Default select example">
                                        <option selected class="d-none"> {{ responseData.bijli_bill }} </option>
                                        <option value="charge per unit"> Charges per Unit </option>
                                        <option value="govt billing"> Govt. Meter Billing </option>
                                        <option value="fixed monthly"> Fixed Monthly </option>
                                        <option value="none"> None (Included in Rent) </option>
                                    </select>
                                </div>

                                <!-- electricity -->
                                <div v-if="perUnitBox">
                                    <div class="d_flex_between">
                                        <div class="form-group floating-group w-50 ">
                                            <input type="number" v-model="perUnit" min="0" name="e_per_unit"
                                                class="form-control" placeholder="">
                                            <label>Per Unit Price</label>
                                        </div>
                                        <div class="form-group floating-group w-50">
                                            <input type="date" v-model="responseData.e_redaing_date"
                                                name="e_redaing_date" class="form-control" placeholder="">
                                            <label>Enter Reading Date</label>
                                        </div>
                                    </div>
                                    <div class="form-group floating-group">
                                        <input type="number" name="bijli_reading" v-model="responseData.bijli_reading"
                                            class="form-control no-spinners" placeholder="">
                                        <label>Enter Reading in Units</label>
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
                                    <div class="form-group floating-group">
                                        <input type="number" v-model="eFixedMonthlyAmount" name="e_fixed_monthly"
                                            class="form-control no-spinners" placeholder="">
                                        <label>Enter Amount</label>
                                    </div>
                                </div>
                                <hr>
                            </div>


                            <!-- water  -->
                            <div class="col-lg-6">
                                <h4> Water Bill</h4>
                                <div class="form-group   px-0 mx-0">
                                    <select class="form-select" @change="waterBill($event)" name="water_bill"
                                        aria-label="Default select example">
                                        <!-- <option selected class="d-none" >Select Rent Mode </option> -->
                                        <option value="charge per unit"> Charges per Unit </option>
                                        <option value="govt billing"> Govt. Meter Billing </option>
                                        <option value="fixed monthly"> Fixed Monthly </option>
                                        <option value="none" selected> None (Included in Rent) </option>
                                    </select>
                                </div>
                                <div v-if="perUnitBox2">
                                    <div class="d_flex_between ">
                                        <div class="form-group floating-group w-50">
                                            <input type="number" v-model="perUnit2" name="w_per_unit"
                                                class="form-control" min="0" placeholder="">
                                            <label>Per Unit Price</label>
                                        </div>
                                        <div class="form-group floating-group w-50">
                                            <input type="date" name="w_redaing_date" class="form-control"
                                                placeholder="">
                                            <label>Enter Date</label>
                                        </div>
                                    </div>
                                    <div class="form-group floating-group ">
                                        <input type="number" name="water_reading" class="form-control no-spinners"
                                            placeholder="">
                                        <label>Enter Water Reading</label>
                                    </div>
                                </div>
                                <div class="d-flex" v-if="govBill2">
                                </div>
                                <div v-if="fixedMonthly2">
                                    <div class="form-group floating-group">
                                        <input type="number" v-model="eFixedMonthlyAmount" name="w_fixed_monthly"
                                            class="form-control no-spinners" placeholder="">
                                        <label>Enter Amount</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group py-3">
                                <button type="button" class="btn  bg_purple text-white  w-100 " v-show="loaderSmall">
                                    <span class="loader-sm"> </span>
                                </button>
                                <button type="submit" name="submit" class="btn bg_purple text-light  form-control"
                                    v-show="submitBtn">
                                    Submit
                                </button>
                            </div>

                            <!-- <div class="form-group py-3">
                            <span class="loader" v-if="loader"></span>
                        </div> -->

                        </div>
                    </div>


                </form>
            </div>
            <div class="col-lg-2">


                <!-- <h6 class="alert alert-success" v-if="successMsg"> Updated Successfully !! </h6>
                <span class="loader" v-if="loader"></span> -->
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import { useDataStore } from '@/store/preData';
import alphaNumeric from '~/components/alphaNumeric.vue';


const store = useDataStore();

// Router access in Nuxt 3
const route = useRoute()
const rowId = ref(route.params.tenentId)

const tanency_type2 = ref('');
const totMembr = ref(true);


// Form & UI States
const responseData = ref([])
const loader = ref(true)
const loaderSmall = ref(false)
const submitBtn = ref(true)
const goback = ref(false)
const isForm2Visible = ref(false) // Replaces direct DOM style overrides

// Tenant fields
const tenent_id = ref('')
const imagePath = ref('')
const roomNumber = ref('')
const TenentName = ref('')
const mobileNumber = ref('')
const gender = ref('')
const totalMemeber = ref(1)
const idType = ref('')
const file = ref(null)
const fileInputRef = ref(null) // Template ref for file input
const form2Ref = ref(null)     // Template ref for form DOM elements
const buildingName = ref('')
const rentAmount = ref('')
const rentStartDate = ref('')
const bijliReading = ref('')

// Bill configuration states
const securityAmt = ref(true)
const mentainChrg = ref('')
const perUnit = ref('')
const govBill = ref('')
const eFixedMonthlyAmount = ref('')
const fixedMonthly = ref('')
const perUnitBox = ref('')
const perUnitBox2 = ref('')
const perUnit2 = ref('')
const govBill2 = ref('')
const wFixedMonthlyAmount = ref('')
const fixedMonthly2 = ref('')

// Methods
const billMode = (e) => {
    const bilValue = e.target.value
    perUnitBox.value = bilValue === 'charge per unit' ? true : ''
    govBill.value = bilValue === 'govt billing' ? true : ''
    fixedMonthly.value = bilValue === 'fixed monthly' ? true : ''
}

const waterBill = (e) => {
    const bilValue2 = e.target.value
    perUnitBox2.value = bilValue2 === 'charge per unit' ? true : ''
    govBill2.value = bilValue2 === 'govt billing' ? true : ''
    fixedMonthly2.value = bilValue2 === 'fixed monthly' ? true : ''
}

const nextShow = () => {
    isForm2Visible.value = true
    goback.value = true
}

const goBack = () => {
    isForm2Visible.value = false
    goback.value = false
}

const getTenancy = () => {
    tanency_type2.value === 'Shop' ? totMembr.value = false : totMembr.value = true;
    // console.log(totMembr.value)
}

// Fetch Data with $fetch
const fetchData = async () => {
    try {
        const data = await $fetch(store.apiBasePath + 'tenent_all_details.php?id=' + `${rowId.value}`, {
            method: 'POST',
            body: {
                id: rowId.value,
                building_name: buildingName.value
            }
        })

        if (data && data[0]) {
            loader.value = false
            const res = data[0]
            responseData.value = data[0]

            tenent_id.value = res.id
            imagePath.value = res.image
            TenentName.value = res.tenent_name
            roomNumber.value = res.room_id
            mobileNumber.value = res.mob_number
            totalMemeber.value = res.total_members
            rentAmount.value = res.rent_amount
            securityAmt.value = res.security_amount
            mentainChrg.value = res.mantenece_charge
            perUnit.value = res.e_per_unit
            eFixedMonthlyAmount.value = res.e_fixed_monthly
            wFixedMonthlyAmount.value = res.w_fixed_monthly
            tanency_type2.value = res.tanency_type

            tanency_type2.value === 'Shop' ? totMembr.value = false : totMembr.value = true;
        }
    } catch (error) {
        console.error('Something went wrong matching response context:', error)
    } finally {
        loader.value = false
    }
}

// Post Data with $fetch (Handling Multi-part Form Files)
const postData = async () => {
    loaderSmall.value = true
    submitBtn.value = false

    // Safely extract native input file element
    if (fileInputRef.value && fileInputRef.value.files[0]) {
        file.value = fileInputRef.value.files[0]
    }

    // Create form data using template reference element
    const formData = new FormData(form2Ref.value)
    if (file.value) {
        formData.append('file', file.value)
    }

    try {
        // $fetch natively structures boundary configs if a FormData object is passed into the body
        const response = await $fetch(store.apiBasePath + 'edit_tenent.php', {
            method: 'POST',
            body: formData
        })
        loaderSmall.value = false
        submitBtn.value = true
        if (response?.image === '') {
            Swal.fire({
                text: response.message,
                color: '#ba0000'
            })
        } else {
            Swal.fire({
                icon: 'success',
                text: response?.message || 'Tenant updated successfully',
                timer: 1500
            })
            if (fileInputRef.value) {
                fileInputRef.value.value = ''
                // Clear file picker
            }
        }
    } catch (error) {
        loaderSmall.value = false
        submitBtn.value = true
        // console.error('Form processing failed:', error)
        console.error("Something went wrong:", error);
        Swal.fire({
            icon: "error",
            text: 'Something went wrong.'
        });
    }
}

// const inputValue = ref('')

// 1. Dynamically determine the max length based on the first character
const maxLength = computed(() => {
    const firstChar = roomNumber.value.charAt(0)
    if (!firstChar) return 2 // Default max length when empty

    // If the first character is a digit, allow 2 characters. Otherwise, restrict to 1.
    return /^\d$/.test(firstChar) ? 2 : 1
})
// 2. Handle and sanitize the input in real-time
const handleInput = (event) => {
    let value = event.target.value
    console.log(firstChar)

    // Strip out any characters that are not alphanumeric
    value = value.replace(/[^a-zA-Z0-9]/g, '')

    // Evaluate max length based on the sanitized first character
    const firstChar = value.charAt(0)
    const currentMax = /^\d$/.test(firstChar) ? 2 : 1

    // Enforce the dynamic slice/trim
    roomNumber.value = value.slice(0, currentMax)

    // Keep the DOM input value in sync with the reactive state
    event.target.value = roomNumber.value
}

// Lifecycle Hooks
onMounted(() => {
    // console.log(rowId.value)
    fetchData();
})
</script>
<style scoped>
.preview_img {
    max-width: 80px;
    max-height: 65px;
    min-height: 60px;
    ;
}

.file_upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.file_upload input {
    padding: 1.6rem;
}

.alpha-num {
    text-transform: uppercase;
}
</style>
