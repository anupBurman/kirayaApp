<template>
    <div class="container text-center">
        <h2> Sign Up Form </h2>
        <div class="row">
            <div class="col-lg-4 col-md-4"></div>
            <div class="col-lg-4 col-md-4">
                <h4 class="text-success"> {{ successMsg }} </h4>
                <h5 class="text-danger"> {{ errMessage }} </h5>

                <form @submit.prevent="handleLogin">
                    <input class="form-control my-2" v-model="name" type="text" placeholder="Enter Name">
                    <input class="form-control my-2" v-model="email" type="email" placeholder="Enter Valid Email">
                    <input class="form-control my-2" v-model="password" type="password" placeholder="Enter Password">
                    <input class="form-control my-2" v-model="confirm" type="password" placeholder="Confirm Password">
                    <br>

                    <button class="btn btn-dark" @click="submitForm">
                        <span v-if="isLoading"> submiting.. </span> <span v-else>Sign In</span>
                    </button>
                </form>
                <!-- {{ responsData }} -->
            </div>
            <div class="col-lg-4 col-md-4"></div>
        </div>


    </div>

</template>

<script setup>
import { ref } from 'vue';
const name = ref('');
const email = ref('');
const password = ref('');
const confirm = ref();
const isLoading = ref(false);
const errMessage = ref('')
const responsData = ref();
const successMsg = ref('')


async function submitForm() {
    isLoading.value = true;
    errMessage.value = ''

    try {
        const formdata = await $fetch('http://localhost/rental_app/api/users.php', {
            method: 'POST',
            body: { name: name.value, email: email.value, password: password.value, confirm: confirm.value, }
        })
        // get rest Api response message to know that actually form submited
        responsData.value = formdata;

        if (responsData.value.sql_massege == 'Inserted') {
            successMsg.value = '!! Form Submited Successfully !!'
        } else {
            errMessage.value = 'Invalid email or password.'
            // errMessage will hide after 3 seconds
            setTimeout(() => {
                errMessage.value = ''
            }, 3000)
        }
        console.log(responsData.value.sql_massege)

    } catch (error) {
        errMessage.value = 'Form Submission Failed !'
        setTimeout(() => {
            errMessage.value = ''
        }, 3000)

        // Capture API errors securely
        // console.error('Login failed:', error)
        // errMessage.value = error.data?.message || 'Something Went Wrong. Please try again.'
    } finally {
        isLoading.value = false;

    }

}

</script>
