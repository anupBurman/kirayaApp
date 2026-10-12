<template>
  <div class="container">
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-lg-12 mb-3">

        <!-- Accordion Section -->
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item" v-for="(data, index) in prop" :key="index">
            <h2 class="accordion-header" :id="'flush-heading-' + index">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                :data-bs-target="'#flush-collapse-' + index" aria-expanded="false"
                :aria-controls="'flush-collapse-' + index">
                <img :src="store.apiBasePath + data.image_path" alt="image" class="rounded prop_image" />
                <span class="px-2">
                  {{ data.building_name }} {{ data.address }} /Property Id:
                </span>
                <span class="btn bg_purple text-light rounded btn-sm py-0">{{ data.id }}</span>
              </button>
            </h2>

            <div :id="'flush-collapse-' + index" class="accordion-collapse  collapse row "
              :aria-labelledby="'flush-heading-' + index" data-bs-parent="#accordionFlushExample">
              <div class="col-lg-4 col-md-4  mb-0 text-primary">
                <div class="d-flex justify-content-between p-2">
                  <span> Total Rooms </span> <span> {{ room_countr }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> Occupied </span> <span> {{ response2.length }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> Vacant </span> <span> {{ room_countr - response2.length }} </span>
                </div>
              </div>

              <div class="col-lg-4 col-md-4  mb-0 text-secondary ">
                <div class="d-flex justify-content-between p-2">
                  <span> Total Shops </span> <span> {{ shop_countr }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> Occupied </span> <span> {{ output.length }} </span>
                </div>
                <div class="d-flex justify-content-between p-2">
                  <span> Vacant </span> <span> {{ shop_countr - output.length }} </span>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 fw-bold text-success mb-0">
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

      <div v-if="errorAlert" class=" col-lg-12 alert alert-danger alert-dismissible">
        {{ errorMessage }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" @click="errorAlert = false"
          aria-label="Close"></button>
      </div>

      <div class="col-lg-12">
        <!-- ===== Rooms Section ===== -->
        <div class="p-3 bg-dark text-light text-start">
          Rooms/Flats - {{ room_countr }}
          <NuxtLink v-if="AddRoom" :to="`/addRoom/${propId}/Room`" >
            <button class="btn btn-sm bg_purple text-white mx-lg-4 round" >
              <i class="bi bi-plus-square-dotted"></i> Add
            </button>
          </NuxtLink>
          <button @click="addRoom" class="btn btn-sm bg_purple text-white mx-lg-4 round" v-else>
            <i class="bi bi-plus-square-dotted"></i> Add Room
          </button>
        </div>

        <div class="row">
          <div class=" col-lg-6 " v-for="(data, i) in response2" :key="i">
            <div class="text-start alert alert-warning p-3 d_flex">
              <NuxtLink :to="`/tenent_profile/${rowId}/${data.id}/${data.rent_start_date}`">
                <div class="d_flex rooms" id="room_s">
                  <i class="bi bi-house-heart-fill"></i>
                  <div>
                    <span class="px-1"> {{ data.tanency_type }} - {{ data.room_id }} </span><br>
                    <span class="px-1">{{ data.tenent_name }} </span>
                    <span class="px-1"> {{ data.id }} </span>
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

        <!-- ////  Shop section /// -->
        <div class="p-3 mt-5 bg-dark text-light text-start">
          Shops - {{ shop_countr }}
          <NuxtLink   :to="`/addRoom/${propId}/Room`" v-if="AddShop">
            <button class="btn btn-sm bg_purple text-white mx-lg-4 round">
              <i class="bi bi-plus-square-dotted"></i> Add Shops
            </button>
          </NuxtLink>
          <button @click="addShop" class="btn btn-sm bg_purple text-white mx-lg-4 round" v-else>
            <i class="bi bi-plus-square-dotted"></i> Add Data in Shops
          </button>
        </div>

        <div class="row">
          <div class="col-lg-6" v-for="(data, i) in output" :key="i">
            <div class="text-start alert alert-warning p-3 d_flex ">
              <NuxtLink :to="`/tenent_profile/${rowId}/${data.id}/${data.rent_start_date}`">
                <div class="d_flex rooms" id="room_s">
                  <i class="bi bi-house-heart-fill"></i>
                  <div>
                    <span class="px-1">Shop No. {{ data.room_id }} </span><br>
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

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUpdate } from 'vue';
import Swal from 'sweetalert2';
import { useDataStore } from '@/store/preData';

const store = useDataStore();
// Nuxt 3 Routing system
const router = useRouter();
const route = useRoute();

// const buildingName = ref('');
const propCity = ref('');
const propAddress = ref('');
const room_countr = ref(1);
const shop_countr = ref(0);
const eMail = ref('');
const response = ref([]);
const imagePath = ref('');

const rowId = ref('');

const propId = ref('')
const errorAlert = ref('');
const errorMessage = ref('');

const response2 = ref([]);
const output = ref([]);
const TotalAmount = ref('');
const recivedAmount = ref('');
const AddRoom = ref(true);
const AddShop = ref(true);

const prop = ref(null);
const getPropById = () => {
  // const dt = store.response.filter(user => Number(user.id) == rowId.value);
  // if (dt) { prop.value = dt; }
  // else {
  //   prop.value = '';
  // }
  // prop.value = dt;
  // console.log(rowId.value)
  // room_countr.value = prop.value[0].room_countr;
  // shop_countr.value = prop.value[0].shop_countr;
  // eMail.value = prop.value[0].user_email;
}

// if available room and occupied rooms is equal then this event will run
const addRoom = () => {
  if (confirm("You have reached Maximum number of rooms of Your Property, if you want to add more rooms then press OK ") === true) {
    router.push('/edit_property/' + rowId.value);
  } else {
    console.log("canceled")
  }
};
const addShop = () => {
  if (confirm("You have reached Maximum number of Shops of Your Property, if you want to add more Shops then press OK ") === true) {
    router.push('/edit_property/' + rowId.value);
  } else {
    console.log("canceled")
  }
};

const postData = async () => {
  rowId.value = route.params.propId;
  // console.log(e);

  try {
    const dt = store.response.filter(user => Number(user.id) == rowId.value);
    if (dt) { prop.value = dt; }
    else {
      prop.value = '';
    }
    prop.value = dt;
    console.log(rowId.value)
    room_countr.value = prop.value[0].room_countr;
    shop_countr.value = prop.value[0].shop_countr;
    eMail.value = prop.value[0].user_email;
    // const Response = await $fetch(store.apiBasePath + 'my_properties_detail.php?id=' + rowId.value, {
    //   method: 'POST',
    //   body: {
    //     id: rowId.value,
    //     building_name: buildingName.value,
    //     prop_city: propCity.value,
    //     prop_address: propAddress.value,
    //     image_path: imagePath.value,
    //   }
    // });

    // $fetch throws error for bad statuses, if execution reaches here it is successful
    // response.value = Response;
    // room_countr.value = response.value[0].room_countr;
    // shop_countr.value = response.value[0].shop_countr;
    // const Uemail = Response[0].user_email;

    const Response2 = await $fetch(store.apiBasePath + 'tenent_details.php?id=' + rowId.value, {
      method: 'POST',
      body: {}
    });
    response2.value = Response2;

    const Output = await $fetch(store.apiBasePath + 'tenent_shop_details.php?id=' + rowId.value, {
      method: 'POST',
      body: {}
    });
    output.value = Output;

    // Rent reminder email logic
    let dd = new Date();
    let day = dd.getDate();
    let rentDate = '';

    // this mail will fire on tenent 35 days completion.
    Response2.forEach(async function myfunc(x) {
      let rd = new Date(x.rent_start_date);
      rentDate = rd.getDate();
      const diffDays = day - rentDate;
      // console.log(diffDays);

      if (diffDays > 5) {
        try {
          await $fetch('http://localhost/rental_app/rent_reminder_mail.php', {
            method: 'POST',
            body: {
              userEmail: eMail.value,
              prop_name: x.prop_name,
              tenent_name: x.tenent_name,
              mobileNum: x.mob_number
            }
          });
          // console.log('done');
        } catch (err) {
          console.log("something went wrong checking email parameters");
        }
      } else {
        console.log('month not completed');
      }
    });

  } catch (error) {
    // Swal.fire({
    //   icon: "error",
    //   text: 'something went wrong data could not fetch.'
    // })
    console.error("something went wrong data couldn't fetch", error);
  }
};

//  total amount under the property
const getAmount = async () => {
  try {
    const Response3 = await $fetch(store.apiBasePath + 'tenent_details.php', {
      method: 'POST',
      body: {
        prop_id: rowId.value,
      }
    });
    TotalAmount.value = Response3;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: 'Failed to Fetch Total Amount.'
    })
    // console.log("something went wrong", error);
  }
};

// recieved Amount uder this property
const receivedAmount = async () => {
  const d = new Date();
  let m = d.getMonth();
  let month = m + 1;
  console.log(month);

  try {
    const Response4 = await $fetch(store.apiBasePath + 'tenent_details.php', {
      method: 'POST',
      body: {
        get_amount: rowId.value,
      }
    });
    recivedAmount.value = Response4;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: 'Failed to Load Recieved Amount.'
    })
  }
};

// Lifecycle hooks conversion
onMounted(() => {
  propId.value = route.params.propId;
  postData();
  getAmount();
  receivedAmount();
});

onBeforeUpdate(() => {
  // buildingName.value;
  if (response2.value.length == room_countr.value) {
    AddRoom.value = false;
  }
  if (output.value.length == shop_countr.value) {
    AddShop.value = false;
  }
});
</script>
<style scoped>
.card_wrap .card {
  border-radius: 9px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  transition: all 0.5s;
}

.card_wrap .card:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  transition: all 0.5s;
}

.prop_image {
  width: 50px;
  border: 1px solid gray;
}

.d_flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rooms i {
  font-size: 2rem;
}

a {
  color: #333;
}

.alert-warning a :hover {
  color: #ff944d;
}

.accordion-flush>.accordion-item>.accordion-header .accordion-button,
.accordion-flush>.accordion-item>.accordion-header .accordion-button.collapsed {
  background-color: antiquewhite;
}
</style>
