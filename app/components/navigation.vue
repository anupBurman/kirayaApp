<template>
    <nav class="navbar navbar-expand-lg bg_purple bg-body-tertiary fixed-top" data-bs-theme="dark">
        <div class="container-fluid ">
            <a class="navbar-brand" href="#">
                <img src="/images/rental_home_logo2.png" />
                <span class="text_orange"> Rent </span> <span>Easy</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">

                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>


                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-start flex-grow-1 ">
                        <li class="nav-item" data-bs-dismiss="offcanvas">
                            <a class="nav-link">
                                <!-- <NuxtLink to="/" @click="refresh()">Home</NuxtLink> -->
                                <NuxtLink to="/">Home</NuxtLink>
                            </a>
                        </li>
                        <li class="nav-item" data-bs-dismiss="offcanvas">
                            <a class="nav-link">
                                <NuxtLink to="/addProperty"> Add Property </NuxtLink>
                            </a>
                        </li>
                        <li class="nav-item" data-bs-dismiss="offcanvas">
                            <a class="nav-link">
                                <NuxtLink to="/myProperties">My Properties </NuxtLink>
                            </a>
                        </li>
                        <li class="nav-item" data-bs-dismiss="offcanvas">
                            <a class="nav-link">
                                <NuxtLink to="/all_tenents"> All Tanents </NuxtLink>
                            </a>
                        </li>



                    </ul>
                    <ul class="navbar-nav justify-content-lg-end flex-grow-1 ">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Account
                            </a>
                            <ul class="dropdown-menu">
                                <li v-if="loginLink">
                                    <a class="dropdown-item">
                                        <NuxtLink to="/login"> login</NuxtLink>
                                    </a>
                                </li>
                                <li v-if="register">
                                    <a class="dropdown-item">
                                        <NuxtLink to="/register"> Register</NuxtLink>
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item log_out" v-if="username"> {{ username }} ! </a>
                                </li>
                                <hr class="dropdown-divider">
                                <li>
                                    <a class="dropdown-item log_out" @click="logOut(), refresh()" v-if="logout"> Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

// Router instance
const router = useRouter()

// Reactive State (formerly data)
const loginLink = ref(true)
const logout = ref(true)
const register = ref(true)
const username = ref('')
const navLinks = ref(true)

// const hideMenu = () => {
//     const smallNav = document.getElementById('navbarNav')
//     if (smallNav) {
//         smallNav.classList.remove('show')
//     }
// }
// const hideMenu2 = () => {
//     const smallNav2 = document.getElementById('navbarNav')
//     if (smallNav2) {
//         smallNav2.classList.remove('show')
//     }
// }
// const refresh = () => {
//     if (typeof window !== 'undefined') {
//         window.location.reload()
//     }
// }

const logOut = () => {
    if (typeof window !== 'undefined') {
        const localUser = localStorage.getItem("userinfo")
        if (localUser) {
            localStorage.removeItem("userinfo")
            router.push('/login') // Ensure 'logIn' page/route exists in Nuxt pages
            logout.value = false
            loginLink.value = true
        } else {
            logout.value = true
        }
    }
}
// Mounted Lifecycle Hook
onMounted(() => {
    const localUser = localStorage.getItem("userinfo")

    if (!localUser) {
        logout.value = false
        navLinks.value = false // Changed from empty string to false to match your boolean state
        router.push('/login')
    } else {
        const localUserParse = JSON.parse(localUser)
        // Ensure 'HomePage' page/route exists
        router.push('/')

        loginLink.value = false
        logout.value = true
        register.value = false
        username.value = localUserParse
    }
})
</script>
<style scoped>
nav.fixed-top {
    position: sticky;
}

nav .offcanvas {
    max-width: 80%;
}


a.log_out:hover {
    color: #ff944d;
    cursor: pointer;
}

.text_orange {
    color: #ff944d;
}

.navbar-brand img {
    height: 32px;
}

a.navbar-brand {
    font-size: 1.8rem;
    display: flex;
    padding: 0px 10px 0px 0px;
}

@media (min-width: 992px) {
    .navbar>.container-fluid {
        justify-content: unset;
    }
}

@media (max-width:567px) {
    .offcanvas .offcanvas-body {
        background: rgb(96, 67, 157);
        background: linear-gradient(97deg, rgba(96, 67, 157, 1) 50%, rgba(126, 89, 203, 1) 100%);
    }
}
</style>