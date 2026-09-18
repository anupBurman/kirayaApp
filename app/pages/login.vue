<template>
    <div class="container-fluid px-0 template"
        style="background-image: url('/images/abstract_01.webp');background-size: cover;">
        <!-- <div class=" py-3 bg_purple">
            <img src="/images/rental_home_logo2.png" alt="Logo" />
            <h2 class="page_header">
                <span class="text_orange">Rent</span><span class="text-light">Easy</span>
            </h2>
        </div> -->

        <!-- Login Section -->
        <div class="row p-4" v-if="loginBlock">
            <h5 class="text-center"> Enter Credentials to Login </h5>
            <div class="col-lg-4"></div>
            <div class="col-lg-4 text-start form p-4">
                <div class="form-group text-secondary pt-2">
                    Don't have an account?
                    <router-link to="/register"><span class="text-dark"> Create account </span></router-link>
                </div>

                <form @submit.prevent="logIn">
                    <div class="form-group ">
                        <label>
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                            Email*
                        </label>
                        <input type="email" placeholder="Enter Your Name" v-model="email" class="form-control" required>
                    </div>
                    <div class="form-group ">
                        <label>
                            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                            Password*
                        </label>
                        <input type="password" maxlength="12" minlength="6" v-model="password" class="form-control"
                            required placeholder="Enter Password">
                    </div>
                    <div class="form-group text-secondary">
                        <input class="form-check-input me-1" type="checkbox" id="user_licence" v-model="userLicence" />
                        End User
                        <NuxtLink to="/terms_conditions">
                            <span class="text-dark"> License Agreement * </span>
                        </NuxtLink>
                    </div>
                    <div>
                        <button type="button" class="btn  bg_purple text-white  w-100 " v-if="loader">
                            <span class="loader-sm"> </span>
                        </button>
                        <button type="submit" class="btn  bg_purple text-white  w-100 " v-if="loginBtn"> Login
                        </button>
                    </div>
                    <div class="form-group text-secondary text-end mt-1">
                        <span class="text-dark" style="cursor: pointer;" @click="forgotfunc"> Forget Password ? </span>
                    </div>
                </form>
            </div>
        </div>

        <!-- Forgot Password Section -->
        <div class="row p-4 " v-if="forgotPass">
            <h5> Enter Registered Email </h5>
            <p> We will send password on your email id </p>

            <div class="col-lg-4"></div>
            <div class="col-lg-4 text-start form p-4">
                <form @submit.prevent="forgotPassword">
                    <div class="form-group ">
                        <label>
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                            Email
                        </label>
                        <input type="email" placeholder="Enter Your Email " v-model="email" class="form-control"
                            required>
                    </div>
                    <div>
                        <button type="button" class="btn  bg_purple text-white  w-100" v-if="loader2">
                            <span class="loader-sm"></span>
                        </button>
                        <button type="submit" class="btn  bg_purple text-white  w-100" v-if="forgotBtn"> Button
                        </button>
                    </div>
                    <div class="form-group text-secondary link_txt  pt-2 ">go to
                        <span class="text-dark" style="cursor: pointer;" @click="goToLogin"> Login </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'custom'
})
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import Custom from '~/layouts/custom.vue';

// Router instance
const router = useRouter();

// State variables (Refs)
const email = ref('');
const password = ref('');
const userLicence = ref(false);
const loginBlock = ref(true);
const forgotPass = ref(false);
const loginBtn = ref(true);
const loader = ref(false);
const loader2 = ref(false);
const forgotBtn = ref(true);

// Methods
const logIn = async () => {
    if (!userLicence.value) {
        Swal.fire({
            icon: "error",
            text: " You must agree to the user license agreement ",
        });
        return;
    }

    loader.value = true;
    loginBtn.value = false;

    try {
        // Updated to use native Nuxt $fetch method
        const data = await $fetch('http://localhost/rental_app/api/user_login.php', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value,
                user_license: userLicence.value,
            }
        });

        // $fetch automatically returns the nested data payload and throws on bad network status
        if (data && data.status === true) {
            localStorage.setItem("userinfo", JSON.stringify(data.sql_massege[0]));
            localStorage.setItem("userId", JSON.stringify(data.sql_massege2));
            console.log(data)
            window.location.reload();
            loader.value = false;
        } else {
            Swal.fire({
                icon: "error",
                text: "Email or Password Wrong !",
            });
            loader.value = false;
            loginBtn.value = true;
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            text: "An error occurred during login. Please try again.",
        });
        loader.value = false;
        loginBtn.value = true;
    }
};

const forgotfunc = () => {
    loginBlock.value = false;
    forgotPass.value = true;
};

const goToLogin = () => {
    loginBlock.value = true;
    forgotPass.value = false;
};

const forgotPassword = async () => {
    forgotBtn.value = false;
    loader2.value = true;

    try {
        // Updated to use native Nuxt $fetch method
        const data2 = await $fetch('https://rentvent.store/api/forgot_password.ph', {
            method: 'POST',
            body: {
                email: email.value,
            }
        });

        if (data2 && data2.status === true) {
            forgotBtn.value = true;
            loader2.value = false;
            Swal.fire({
                icon: "success",
                text: "Mail sent successfully, please check your mail.",
            }).then(() => {
                router.push('/login');
            });
        } else {
            console.log(data2);
            Swal.fire({
                icon: "error",
                text: "This Email is Not Registered With Our Database, Please try with another Email Id !",
            });
            forgotBtn.value = true;
            loader2.value = false;
        }
    } catch (error) {
        console.error(error);
        forgotBtn.value = true;
        loader2.value = false;
    }
};
</script>
<style>
.otp_box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.otp_box input {
    width: 40px;
    height: 40px;
    border-radius: 7px;
}

.link_txt {
    cursor: pointer;
    text-align: end;
}

.link_txt .text-dark:hover {
    color: #d15834 !important;
}

.form-group {
    margin-bottom: 1rem;
}
</style>
