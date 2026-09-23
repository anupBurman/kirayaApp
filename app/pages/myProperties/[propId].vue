<template>
  <div class="container">
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-lg-12 mb-3">

        <!-- Accordion Section -->
         <!-- Dynamically targeted accordion buttons -->
          <!-- Dynamically targeted accordion body -->

        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item" v-for="(data, index) in response" :key="index">
            <h2 class="accordion-header" :id="'flush-heading-' + index">
              <button 
                class="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse"
                :data-bs-target="'#flush-collapse-' + index" 
                aria-expanded="false"
                :aria-controls="'flush-collapse-' + index"
              >
                <img :src="basePath + data.image_path" alt="image" class="rounded prop_image" />
                <span class="px-2">
                  {{ data.building_name }}, {{ data.address }} /Property Id:
                </span>
                <span class="btn bg_purple text-light rounded btn-sm py-0">{{ data.id }}</span>
              </button>
            </h2>

            
            <div 
              :id="'flush-collapse-' + index" 
              class="accordion-collapse collapse row"
              :aria-labelledby="'flush-heading-' + index" 
              data-bs-parent="#accordionFlushExample"
            >
              <div class="col-lg-6 col-md-6">
                <div class="d-flex justify-content-between p-2">
                  <span> Total Rooms </span> <span> {{ room_countr }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> Occupied </span> <span> {{ response2.length }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> To-Let </span> <span> {{ room_countr - response2.length }} </span>
                </div>
                
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="d-flex justify-content-between p-2">
                  <span> Total </span> <span> {{ TotalAmount }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> Received Amount </span> <span> {{ recivedAmount }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> Due Amount </span> <span> {{ TotalAmount - recivedAmount }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ===== Rooms Section ===== -->
      <div class="col-lg-6">
        <div v-if="errorAlert" class="alert alert-danger alert-dismissible">
          {{ errorMessage }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" @click="errorAlert = false" aria-label="Close"></button>
        </div>

        <div class="p-3 bg-dark text-light text-start"> 
          Rooms/Flats - {{ room_countr }}
          <NuxtLink to="/addRoom" v-if="AddRoom">
            <button class="btn btn-sm bg_purple text-white mx-lg-4 round">
              <i class="bi bi-plus-square-dotted"></i> Add
            </button>
          </NuxtLink>
          <button @click="addRoom" class="btn btn-sm bg_purple text-white mx-lg-4 round" v-else>
            <i class="bi bi-plus-square-dotted"></i> Add Room
          </button>
        </div>

        <div class="text-start alert alert-warning p-3 d_flex" v-for="(data, i) in response2" :key="i">
          <NuxtLink :to="`/tenent_profile/${rowId}/${data.id}/${data.rent_start_date}`">
            <div class="d_flex rooms" id="room_s">
              <i class="bi bi-house-heart-fill"></i>
              <div>
                <span class="px-1">Room No. {{ data.room_id }} </span><br>
                <span class="px-1">{{ data.tenent_name }} </span>
                <span class="px-1">{{ data.id }}</span>
              </div>
            </div>
          </NuxtLink>
          <button class="btn btn-default btn-sm round">
            {{ data.rent_amount }}
          </button>

          <NuxtLink :to="`/edit_tenent/${data.id}`">
            <button class="btn btn-dark btn-sm round">Edit</button>
          </NuxtLink>
        </div>
      </div>

      <!-- ===== Shops Section ===== -->
      <div class="col-lg-6">
        <div class="p-3 bg-dark text-light text-start"> 
          Shops - {{ shop_countr }}
          <NuxtLink :to="tabURL2 + rowId">
            <button class="btn btn-sm bg_purple text-white mx-lg-4 round">
              <i class="bi bi-plus-square-dotted"></i> Add Data in Shops
            </button>
          </NuxtLink>
        </div>
        
        <div class="text-start alert alert-warning p-3 d_flex" v-for="(data, i) in output" :key="i">
          <NuxtLink :to="`/tenent_profile/${rowId}/${data.id}/${data.rent_start_date}`">
            <div class="d_flex rooms" id="room_s">
              <i class="bi bi-house-heart-fill"></i>
              <div>
                <span class="px-1">Shop No. {{ data.shop_id }} </span><br>
                <span class="px-1">{{ data.tenent_name }} </span>
                <span class="px-1">{{ data.id }}</span>
              </div>
            </div>
          </NuxtLink>
          <button class="btn btn-default btn-sm round">
            {{ data.rent_amount }}
          </button>

          <NuxtLink :to="`/edit_tenent/${data.id}`">
            <button class="btn btn-dark btn-sm round">Edit</button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUpdate } from 'vue';
import Swal from 'sweetalert2';

// Nuxt 3 Routing system
const router = useRouter();
const route = useRoute();

// State definitions using Composition API refs
const buildingName = ref('');
const propCity = ref('');
const propAddress = ref('');
const room_countr = ref(1);
const shop_countr = ref(0);
const response = ref([]);
const basePath = ref('http://localhost/rental_app/api/');
const imagePath = ref('');
const tabURL = ref('/addRoom/');
const tabURL2 = ref('/add_shop/');
const rowId = ref('');

const errorAlert = ref('');
const errorMessage = ref('');

const response2 = ref([]);
const output = ref([]);
const TotalAmount = ref('');
const recivedAmount = ref('');
const AddRoom = ref(true);



// if available room and occupied rooms is equal then this event will run
const addRoom = () => {
    if (confirm("You have reached Maximum number of rooms of Your Property, if you want to add more rooms then press OK ") === true) {
        router.push('/edit_property/' + rowId.value);
    } else {
        console.log('hj');
    }
};

const postData = async (e) => {
    rowId.value = route.params.propId;
    console.log(e);
    
    try {
        const Response = await $fetch('http://localhost/rental_app/api/my_properties_detail.php?id=' + rowId.value, {
            method: 'POST',
            body: {
                id: rowId.value,
                building_name: buildingName.value,
                prop_city: propCity.value,
                prop_address: propAddress.value,
                image_path: imagePath.value,
            }
        });
        
        // $fetch throws error for bad statuses, if execution reaches here it is successful
        response.value = Response;
        room_countr.value = response.value[0].room_countr;
        shop_countr.value = response.value[0].shop_countr;
        
        const Uemail = Response[0].user_email;

        const Response2 = await $fetch('http://localhost/rental_app/api/tenent_details.php?id=' + rowId.value, {
            method: 'POST',
            body: {}
        });
        response2.value = Response2;

        const Output = await $fetch('http://localhost/rental_app/api/tenent_shop_details.php?id=' + rowId.value, {
            method: 'POST',
            body: {}
        });
        output.value = Response2; // Kept matching your original script fallback usage of Response2 here

        // Rent reminder email logic
        let dd = new Date();
        let day = dd.getDate();
        let rentDate = '';

        Response2.forEach(async function myfunc(x) {
            let rd = new Date(x.rent_start_date);
            rentDate = rd.getDate();
            const diffDays = day - rentDate;
            console.log(diffDays);

            if (diffDays > 5) {
                try {
                    await $fetch('http://localhost/rental_app/api/rent_reminder_mail.php', {
                        method: 'POST',
                        body: {
                            userEmail: Uemail,
                            prop_name: x.prop_name,
                            tenent_name: x.tenent_name,
                            mobileNum: x.mob_number
                        }
                    });
                    console.log('done');
                } catch (err) {
                    console.log("something went wrong checking email parameters");
                }
            } else {
                console.log('month not completed');
            }
        });

    } catch (error) {
        console.error("something went wrong data couldn't fetch", error);
    }
};

const getAmount = async () => {
    try {
        const Response3 = await $fetch('http://localhost/rental_app/api/tenent_details.php', {
            method: 'POST',
            body: {
                prop_id: rowId.value,
            }
        });
        TotalAmount.value = Response3;
    } catch (error) {
        console.log("something went wrong", error);
    }
};

const receivedAmount = async () => {
    const d = new Date();
    let m = d.getMonth();
    let month = m + 1;
    console.log(month);
    
    try {
        const Response4 = await $fetch('http://localhost/rental_app/api/tenent_details.php', {
            method: 'POST',
            body: {
                get_amount: rowId.value,
            }
        });
        recivedAmount.value = Response4;
    } catch (error) {
        console.log("something went wrong", error);
    }
};

const deleteTenent = async (tid) => {
    console.log(tid);
    if (confirm('Do you really want to delete this data ?')) {
        try {
            await $fetch('http://localhost/rental_app/api/delete_tenentr.php', {
                method: 'POST',
                body: {
                    tenentId: tid,
                }
            });
            
            Swal.fire({
                icon: "success",
                text: 'Tenent Data Deleted ',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
              router.push('/myProperties');
                // router.push({ name: 'MyProperties' });
            });
        } catch (error) {
            console.log("something went wrong", error);
        }
    }
};

// Lifecycle hooks conversion
onMounted(() => {
  console.log(route.params.addRoom)
    postData();
    // getAmount();
    // receivedAmount();
});

onBeforeUpdate(() => {
    buildingName.value;
    if (response2.value.length == room_countr.value) {
        AddRoom.value = false;
    }
});
</script>

