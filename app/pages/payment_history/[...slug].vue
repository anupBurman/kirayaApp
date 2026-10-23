<template>
    <div class="container-fluid" v-if="payHistory" id="tbl">
        <!-- {{ response }} -->
        <!-- {{ response2 }} -->
        
        <div  class="row px-lg-2 py-lg-4 pt-2 tbl_view">
            <div class="col-3 ">
                <h6>Tanent Name: {{ response.tenent_name }} </h6>
                <h6> Room No: {{ response.room_id }} </h6>
            </div>
            <div class="col-3">
                <h6> Rent Start Date: {{ response.rent_start_date }} </h6>
                <h6> Mobile Number: {{ response.mob_number }} </h6>
            </div>
            <div class="col-3">
                <h6> Occupation: {{ response.occupation }} </h6>
                <h6> Tanency Type: {{ response.tanency_type }} </h6>
            </div>

            <div class="col-3">
                <h6> Rent Mode: {{ response.rent_mode }} </h6>
                <h6> Security Amount: {{ response.security_amount }} </h6>
            </div>
        </div>


        <div style="overflow-x: auto;" tbl_view>
            <table class="table mb-lg-2 table-secondary">
                <!-- <thead>
                    <tr class="table-dark">
                        <th scope="col"> Bill Date </th>
                        <th scope="col"> Pre-Units </th>
                        <th scope="col"> Current-Units  </th>
                        <th scope="col">Rent </th>
                        <th scope="col"> Electricity Charge </th>
                        <th scope="col"> Mantenece Charges </th>
                    </tr>
                </thead> -->
                <tbody>
                    <tr v-for="(data, index) in response2" :key="index">
                        <td>
                            <h6>Bill Date</h6> <span> {{ dd }}-{{ mm }}-{{ yy }} </span>
                        </td>
                        <td>
                            <h6> Pre-Units</h6> <span> {{ data.last_reading }}</span>
                        </td>
                        <td>
                            <h6>Current-Units </h6> <span> {{ data.current_reading }} </span>
                        </td>
                        <td>
                            <h6>Rent </h6> <span> 5000 </span>
                        </td>
                        <td v-if="response.e_per_unit > 1">
                            <h6>Electricity Charge</h6> <span> {{ ((data.current_reading - data.last_reading) *
                                response.e_per_unit) }} </span>
                        </td>
                        <td v-if="response.e_fixed_monthly > 10">
                            <h6>Electricity Charge</h6> <span> {{ response.e_fixed_monthly }} </span>
                        </td>
                        <td v-if="response.bijli_bill === 'govt billing'">
                            <h6>Electricity Charge</h6> <span> {{ response.e_fixed_monthly }} </span>
                        </td>

                        <td>
                            <h6>Mantenece Charges</h6> <span> {{ response.mantenece_charge }} </span>
                        </td>
                        <td>
                            <h6> Total </h6>
                            <!-- <span> Total: </span> -->
                            <!-- IF ELECTRICITY CHARGES ACCORDING TO PER UNIT WISE then it will show -->
                            <span v-if="response.e_per_unit > 1">
                                {{ subTotal = parseInt(response.rent_amount) + ((data.current_reading -
                                    data.last_reading) *
                                    response.e_per_unit) + parseInt(response.mantenece_charge) }}

                            </span>

                            <!-- IF ELECTRICITY CHARGES BY GOVT. METER  -->
                            <span v-if="response.bijli_bill === 'govt billing'">
                                {{ subTotal = parseInt(response.e_fixed_monthly) + parseInt(response.rent_amount) +
                                    parseInt(response.mantenece_charge) }}
                            </span>

                            <span v-if="response.e_fixed_monthly > 10">
                                {{ subTotal = parseInt(response.e_fixed_monthly) + parseInt(data.recieved_amount) +
                                    parseInt(response.mantenece_charge) }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="!response2 || response2.length <= 0">
           
            <h5 class="text-center text-secondary py-5">
                 <i class="fa fa-arrow-circle-left text-dark pe-4" aria-hidden="true" @click="showPayHistory"></i>
                No payment history found !
            </h5>
        </div>
        <div v-else class="d_flex_between align-items-center action_icons">
            <i class="fa fa-arrow-circle-left" aria-hidden="true" @click="showPayHistory"></i>
            <div>
                <i class="fa fa-file-pdf-o  text-danger " aria-hidden="true" @click="makePdf($event)"></i>
                <i class="fa fa-download" aria-hidden="true" @click="makePdf($event)"></i>
            </div>
            <!-- <button type="button" class="btn btn-sm bg_purple text-white mx-lg-4 round" @click="showPayHistory">
               <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
            </button> -->
        </div>
    </div>

    <div class="container-fluid " v-else>
        <div class="row px-lg-5 mb-5 profile_comp">

            <div class="py-3">
                <!-- Replaced router-link with NuxtLink -->
                <NuxtLink :to="`/ganrate_bill/${response.prop_id}/${response.id}/${monthh}`">
                    <button type="button" class="btn bg_success text-white mx-lg-4 round">
                        Generate Bill
                    </button>
                </NuxtLink>

                <button type="button" class="btn bg_purple text-white mx-lg-4 round" @click="showPayHistory">
                    Payment History
                </button>

            </div>


            <div class="col-lg-4 text-start alert alert-warning">
                <div class="d_flex_between">
                    <div class="d-flex">
                        <!-- <img src="/man.png" style="width: 50px;" alt="Tenant Avatar" /> -->
                        <div class="px-3">
                            <span>{{ response.tenent_name }} /</span> <span>Tanent id: {{ response.id }}</span>
                            <div>
                                <span>Room No: {{ response.room_id }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="three_dots dropdown px-1">
                        <i class="fa fa-list-ul" id="dropdownMenuButton1" data-bs-toggle="dropdown"></i>
                        <ul class="dropdown-menu bg_purple" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <div class="dropdown-item">
                                    <!-- Replaced router-link with NuxtLink -->
                                    <NuxtLink :to="`/edit_tenent/${response.id}`">
                                        <i class="fa fa-pencil-square pe-2" aria-hidden="true"></i> Edit Tanent Profile
                                    </NuxtLink>
                                </div>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" @click.prevent="deleteTenent()">
                                    <i class="fa fa-trash clr_orange pe-2" aria-hidden="true"></i> Delete Tanent
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" @click.prevent="deleteBills()">
                                    <i class="fa fa-trash clr_orange pe-2" aria-hidden="true"></i> Delete Bills
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr>

                <div class="d_flex_between">
                    <span>Maintenance: </span> <span> {{ response.mantenece_charge }} </span>
                </div>
                <div class="d_flex_between">
                    <span>Security Deposit: </span> <span>{{ response.security_amount }}</span>
                </div>
                <div class="d_flex_between">
                    <span>Rent Mode: </span> <span>{{ response.rent_mode }}</span>
                </div>
                <div class="d_flex_between">
                    <span>Rent Start Date: </span> <span>{{ dayy }}-{{ monthh }}-{{ Yearr }}</span>
                </div>

                <div class="d_flex_between">
                    <span>Monthly Rent Amount</span> <span>{{ response.rent_amount }}</span>
                </div>
                <div class="d_flex_between">
                    <span>Electricity</span> <span> {{ response.bijli_bill }}</span>
                </div>
                <div v-if="response.e_per_unit > 1" class="d_flex_between">
                    <span>Per Unit Charge </span> <span> Rs. {{ response.e_per_unit }}</span>
                </div>
                <hr>
                <div class="d_flex_between">
                    <span>Next Due Date</span> <span>{{ dayy }}-{{ parseInt(monthh) + 1 }}-{{ Yearr }}</span>
                </div>
                <div class="d_flex_between">
                    <span>Total Members</span> <span>{{ response.total_members }}</span>
                </div>
                <div class="d_flex_between">
                    <span>Mobile Number:</span> <span>{{ response.mob_number }}</span>
                </div>
            </div>

            <!-- //////////  Right section start /////////// -->

            <!-- If no payment history found -->
            <div class="col-lg-8 alert alert-danger right_section text-center py-5"
                v-if="!response2 || response2.length <= 0">
                <h6>No payment history found. <br> Please first receive payment and then generate bill</h6>
            </div>

            <!-- Received payment history mapping -->
            <div class="col-lg-8 text-start alert alert-default py-0 bg-light" id="tbl2"
                v-for="(data, index) in response2" :key="index">
                <button type="button" class="btn btn-default outline_purple round mx-lg-4 my-2">
                    {{ dayy }}-{{ data.month }}-{{ Yearr }} To {{ dayy }}-{{ parseInt(data.month) + 1 }}-{{ Yearr }}
                </button>
                <div class="row alert alert-danger mb-0">
                    <div class="col-3">
                        <h6 class="text_bold mb-0">Electricity Details</h6>
                    </div>
                    <div class="col-3">
                        <h6 class="text_bold mb-0">Water Details</h6>
                    </div>
                    <div class="col-6">
                        <h6 class="text_bold mb-0">Rent Details</h6>
                    </div>
                </div>

                <div class="row right_section py-3">
                    <div class="col-3">
                        <h6 class="text_bold">Electricity</h6>
                        <!-- Fixed math rendering (removed inline assignment variable) -->
                        <h6 v-if="response.e_per_unit > 1">
                            {{ data.current_reading - data.last_reading }} Units
                        </h6>
                        <h6 v-else-if="response.bijli_bill === 'fixed monthly'">
                            Fixed Monthly
                        </h6>
                        <h6 v-else-if="response.bijli_bill === 'govt billing'">
                            Govt Meter Billing
                        </h6>
                        <h6 v-else>
                            Charge Included in rent
                        </h6>

                        <h6 class="text_bold">Current Reading</h6>
                        <h6>{{ data.current_reading }}</h6>
                        <h6>Date: {{ data.e_reading_date }}</h6>
                        <h6 class="text_bold">Charge per Unit</h6>
                        <h6>Rs. {{ response.e_per_unit }}</h6>
                        <h6 class="text_bold">Previous Reading</h6>
                        <h6>{{ data.last_reading }} Units</h6>
                    </div>

                    <div class="col-3">
                        <h6 class="text_bold">Water Bill Not Applicable</h6>
                    </div>

                    <!-- IF ELECTRICITY CHARGES ACCORDING TO PER UNIT WISE -->
                    <div class="col-6" v-if="response.e_per_unit > 1">
                        <div class="d_flex_between">
                            <span>Monthly Rent</span>
                            <span class="text_bold">{{ response.rent_amount }}</span>
                        </div>
                        <div class="d_flex_between">
                            <span>Electricity Charge</span>
                            <span class="text_bold">
                                {{ ((data.current_reading - data.last_reading) * response.e_per_unit) }}
                            </span>
                        </div>
                        <div class="d_flex_between mb-5 pb-4">
                            <span> Monthly Mantenece Charges </span>
                            <span class="text_bold">

                                {{ response.mantenece_charge }}
                            </span>
                        </div>

                        <hr>
                        <!-- <div class="d_flex_between">
              <span>Sub Total</span>
              <span class="text_bold">
                Rs. {{ parseInt(response.rent_amount) + ((data.current_reading - data.last_reading) *
                  response.e_per_unit) + parseInt(response.mantenece_charge) }}
              </span>
            </div> -->
                    </div>

                    <!-- IF ELECTRICITY CHARGES BY GOVT. METER  -->
                    <div class="col-6 " v-if="response.bijli_bill === 'govt billing'">
                        <div class="d_flex_between">
                            <span> Monthly Rent </span>
                            <span class="text_bold"> {{ data.rent_amount }} </span>
                        </div>

                        <div class="d_flex_between mb-5 pb-4">
                            <span> Monthly Mantenece Charges </span>
                            <span class="text_bold">
                                {{ response.mantenece_charge }}
                            </span>
                        </div>
                        <hr>
                    </div>


                    <!-- IF ELECTRICITY CHARGES FIXED MONTHLY -->
                    <div class="col-6 " v-if="response.e_fixed_monthly > 10">
                        <div class="d_flex_between">
                            <span> Monthly Rent </span>
                            <span class="text_bold"> {{ response.rent_amount }} </span>
                        </div>
                        <div class="d_flex_between ">
                            <span> Electricity fixed Charge </span>
                            <span class="text_bold">
                                {{ response.e_fixed_monthly }}
                            </span>
                        </div>
                        <div class="d_flex_between mb-5 pb-4">
                            <span> Monthly Mantenece Charges </span>
                            <span class="text_bold">
                                {{ response.mantenece_charge }}
                            </span>
                        </div>
                        <hr>
                    </div>


                    <div class="d_flex_between alert alert-success   text_bold">
                        <div>
                            <span> Bill Date: </span> <span> {{ dd }}-{{ mm }}-{{ yy }} </span>
                        </div>
                        <div>
                            <span> Total </span>
                        </div>
                        <div>
                            <!-- <span> Total: </span> -->
                            <!-- IF ELECTRICITY CHARGES ACCORDING TO PER UNIT WISE then it will show -->
                            <span v-if="response.e_per_unit > 1">
                                Rs. {{ subTotal = parseInt(response.rent_amount) + ((data.current_reading -
                                    data.last_reading) *
                                    response.e_per_unit) + parseInt(response.mantenece_charge) }}

                            </span>

                            <!-- IF ELECTRICITY CHARGES BY GOVT. METER  -->
                            <span v-if="response.bijli_bill === 'govt billing'">
                                Rs. {{ subTotal = parseInt(response.e_fixed_monthly) + parseInt(response.rent_amount) +
                                    parseInt(response.mantenece_charge) }}
                            </span>

                            <span v-if="response.e_fixed_monthly > 10">
                                Rs. {{ subTotal = parseInt(response.e_fixed_monthly) + parseInt(data.recieved_amount) +
                                    parseInt(response.mantenece_charge) }}
                            </span>
                        </div>
                    </div>

                    <div class="d_flex align-items-center action_icons">
                        <a :href="`https://api.whatsapp.com/send?phone=` + response.mob_number + `&text=` + `Hello ` + response.tenent_name + ` your rent `
                            + subTotal + ` is ganareted please pay on considred date`" target="_blank">
                            <i class="fa fa-whatsapp text-success "> </i>
                        </a>
                        <i class="fa fa-file-pdf-o  text-danger " aria-hidden="true" @click="makePdf($event)"></i>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import html2PDF from 'jspdf-html2canvas'
import { useDataStore } from '@/store/preData';


const store = useDataStore();
// Initialize Nuxt Router & Route utilities
const route = useRoute()
const router = useRouter()


// Reactive state variables (Replaces Options API data())
const response = ref([])
const response2 = ref([])
const month = ref('')
const dayy = ref('')
const monthh = ref('')
const Yearr = ref('')

const dd = ref('')
const mm = ref('')
const yy = ref('')
const lastReading = ref('')
const currentReading = ref('')
const localUserId = ref('')
const tenentId = ref('')
const propId = ref('')
const loader = ref('')
const successAlert = ref(false)
const errorAlert = ref(false)

const subTotal = ref('')
const payHistory = ref(false)


const showPayHistory = () => {
    payHistory.value == false ? payHistory.value = true : payHistory.value = false
}

// Methods rewritten as standard JavaScript functions
const getTenentData = async () => {
    // Capture tenantId from current route parameters
    // const tId = route.params.tenentId
    const tId = route.params.slug[1];
    const pId = route.params.slug[0];
    // console.log(tId)
    tenentId.value = tId;
    propId.value = pId;

    try {
        //  native Nuxt  $fetch API call
        const data = await $fetch(store.apiBasePath + 'tenent_all_details.php', {
            method: 'POST',
            body: {
                id: tenentId.value,
            }
        })

        if (data && data[0]) {
            response.value = data[0]

            // Convert yy-mm-dd format to dd-mm-yy format and separate each
            const inputDate = response.value.rent_start_date
            if (inputDate) {
                const [saal, mahina, din] = inputDate.split('-')
                dayy.value = din
                monthh.value = mahina
                Yearr.value = saal
            }
        }
    } catch (error) {
        console.error("something went wrong", error)
    }
}

const getRentReceived = async () => {
    // Extract parameters from route context
    //  const startDate = route.params.rent_start_date
    const startDate = route.params.slug[2]
    console.log(startDate)
    if (startDate) {
        const [yyy, mmm, ddd] = startDate.split('-')
        dayy.value = ddd
        monthh.value = mmm
        Yearr.value = yyy
    }
    // Current billing date breakdown
    const d = new Date()
    const year = d.getFullYear()
    let currentMonth = d.getMonth() + 1
    let day = d.getDate()
    if (day < 10) day = '0' + day

    try {
        //  with native Nuxt $fetch API call
        const data2 = await $fetch(store.apiBasePath + 'electric_water_bill.php', {
            method: 'POST',
            body: {
                id: tenentId.value,
                month: monthh.value
            }
        })

        if (data2 && data2.length >= 1) {
            response2.value = data2
            month.value = response2.value.month
            mm.value = currentMonth
            dd.value = day
            yy.value = year
            // Verification logic when next due date completes
            if (currentMonth < 10) currentMonth = '0' + currentMonth
            const plusOne = parseInt(currentMonth) + 1
            const dueMonth = '0' + plusOne

            if (day == dayy.value && monthh.value == dueMonth) {
                alert('Month Completed')
            } else {
                console.log(day)
            }
        }
    } catch (error) {
        console.error("something went wrong", error)
    }
}

const deleteTenent = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to get data of this Tanent again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                //  native Nuxt 3 $fetch API call
                await $fetch(store.apiBasePath + 'delete_tenent.php', {
                    method: 'POST',
                    body: {
                        propId: propId.value,
                        tenentId: tenentId.value,
                    }
                })
                Swal.fire({
                    icon: "success",
                    text: 'Tenent Data Deleted ',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    router.push('/myProperties')
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: 'Something went wrong.'
                });
            }
        };
    });
}

const deleteBills = async () => {
    if (confirm('Do you really want to delete Bills of This Tenent ?')) {
        try {
            //  native Nuxt 3 $fetch API call
            await $fetch(store.apiBasePath + 'delete_bills.php', {
                method: 'POST',
                body: {
                    userId: localUserId.value,
                    tenentId: tenentId.value,
                }
            })
            Swal.fire({
                icon: "success",
                text: 'Tenent Bills Data Deleted ',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                router.push('/myProperties')
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: 'Something Went Wrong.'
            });
            // console.error("something went wrong", error)
        }
    }
}

const makePdf = (evnt) => {
    // console.log(evnt)
    const page = document.getElementById('tbl')
    if (page) {
        html2PDF(page, {
            html2canvas: {
                scale: 2,           // Increases the resolution/sharpness of the text
                letterRendering: true
            },
            jsPDF: {
                format: 'a4',
            },
            output: './pdf/generate.pdf'
        })

    }
}


// Replaces the Options API mounted() lifecycle hook
onMounted(async () => {
    const user_id = localStorage.getItem("userId");
    localUserId.value = JSON.parse(user_id)
    await getTenentData()
    await getRentReceived()
})
</script>
<style scoped>
@media (max-width:567px) {
    .action_icons i {
        font-size: 1rem !important;
    }

    h6 {
        font-size: 9px !important;
        margin-bottom: .1rem;
    }

    h6+span {
        font-size: 9px !important;
    }

    .table>:not(caption)>*>* {
        padding: .2rem .2rem;
        line-height: normal;
    }

    table.table {
        margin-bottom: 5px;
    }
}

.profile_comp {
    justify-content: end;
}

#tbl {
    background-color: aliceblue;
}

.right_section .col-3 {
    border-right: 1px solid rgb(216, 216, 216);
}

.preview_img {
    max-width: 80px;
    max-height: 65px;
    min-height: 60px;
}

.form {
    background-color: #d9d0eb;
    border-radius: 8px;
}

.file_upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.file_upload input {
    padding: 1.6rem;
}

.action_icons i {
    cursor: pointer;
    font-size: 1.6em;
    margin-right: 1rem;
}

.action_icons i:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    transition: all 0.5s;
}
</style>
