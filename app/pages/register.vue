<template>
  <div class="container-fluid px-0 template"
    style="background-image: url('/images/abstract_01.webp');background-size: cover;">
    <!-- <div class="py-3 bg_purple">
      <img src="/images/rental_home_logo2.png" />
      <h2 class="page_header">
        <span class="text_orange">Rent</span><span class="text-light">Easy</span>
      </h2>
    </div> -->
    <h3 class="text-center"> Create Account </h3>
    <div class="row px-lg-5 p-3">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 text-start">
        <div class="form p-4">
          <form @submit.prevent="postData">
            <div class="form-group">
              <label>
                <i class="fa fa-user" aria-hidden="true"></i> Please Enter Name <span class="text_warning"> * </span>
              </label>
              <input type="text" placeholder="Name" v-model="name" required class="form-control">
            </div>
            <div class="form-group">
              <label>
                <i class="fa fa-envelope" aria-hidden="true"></i>Enter Valid E-mail <span class="text_warning"> *
                </span>
              </label>
              <input type="email" placeholder="Email" v-model="email" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="d_flex_between">
                <span>
                  <i class="fa fa-unlock-alt"  aria-hidden="true"></i>Password <span class="text_warning">
                    * </span>
                </span>
                <i class="fa fa-info-circle px-2 " @click="info" aria-hidden="true"> </i>
                <!-- <span class="info_card alert alert-warning ">
                  <ul class="ps-3">
                    <li> Minimum length must be 6 characters and maximum 12 characters </li>
                    <li> should be atleast 1 numeric character. </li>
                  </ul>
                </span> -->
              </label>
              <input type="password" v-model="password" minlength="6" maxlength="10" class="form-control" required
                placeholder="Password">
            </div>
            <div class="form-group">
              <label>
                <i class="fa fa-unlock-alt" aria-hidden="true"></i> Confirm Password <span class="text_warning"> *
                </span>
              </label>
              <input type="password" v-model="conformPass" minlength="6" maxlength="10" class="form-control"
                placeholder="Password">
            </div>
            <div>
              <button type="button" class="btn bg_purple text-white w-100" v-show="loader">
                <span class="loader-sm"></span>
              </button>
              <button type="submit" class="btn bg_purple text-white w-100" v-show="signInBtn">
                Register
              </button>
            </div>
            <div class="form-group text-secondary pt-2">
              Already have an account? <NuxtLink to="/login"><span class="text-dark"> Login </span></NuxtLink>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useDataStore } from '@/store/preData';

const store = useDataStore();

definePageMeta({
  layout: 'custom'
})

// State variables
const name = ref('');
const email = ref('');
const password = ref('');
const conformPass = ref('');
const loader = ref(false);
const signInBtn = ref(true);

// Router instance
const router = useRouter();

// Lifecycle hook (replacing mounted)
onMounted(() => {
  const localUser = localStorage.getItem("userinfo");
  if (!localUser) {
    router.push('/register');
  } else {
    console.log(localUser);
    // router.push('/');
  }
});

const info = () => {
  Swal.fire({
    text: 'Minimum length must be 6 characters and maximum 12 characters, should be atleast 1 numeric character'
  });
}

// Methods
const postData = async () => {
  loader.value = true;
  signInBtn.value = false;

  if (password.value !== conformPass.value) {
    Swal.fire({
      icon: "error",
      text: "Confirm Password Mismatch",
    });
    loader.value = false;
    signInBtn.value = true;
    return;
  }

  try {
    // $fetch call replacing axios
    const response = await $fetch(store.apiBasePath + 'users.php', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        confirm: conformPass.value
      }
    });

    console.log(response?.sql_massege);

    if (response?.sql_massege === 'Inserted') {
      Swal.fire({
        title: "Registration Done !!",
        icon: "success",
        text: 'You can login now',
      }).then(() => {
        router.push('/logIn');
      });
    } else {
      throw new Error('Not inserted');
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Something went wrong!",
    });
    loader.value = false;
    signInBtn.value = true;
  }
};

// const refresh = () => {
//   window.location.reload();
// };
</script>

<style>
/* Style remains identical */
</style>
