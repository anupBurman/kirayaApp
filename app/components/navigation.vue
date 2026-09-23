<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link"> Home </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="nav-link"> About </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/products" class="nav-link"> Products </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/vision" class="nav-link"> Vision </NuxtLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Examples
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <NuxtLink to="/examples/reactives" class="nav-link"> Reactives </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/examples/apiCall" class="nav-link"> API call </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/examples/apiCall2" class="nav-link"> API call 2 </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/examples/signup" class="nav-link"> Signup </NuxtLink>
              </li>

            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown link
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <NuxtLink to="/posts/" class="nav-link"> All posts </NuxtLink>
              </li>
            </ul>
          </li>
          <li>
            <NuxtLink to="/login" class="nav-link"> Login </NuxtLink>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template> -->

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg_purple " v-if="navLinks">
    <div class="container-fluid ">
      <a class="navbar-brand " href="#">
        <img src="/images/rental_home_logo2.png" />
        <span class="text_orange"> Rent </span> <span>Easy</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link"> <NuxtLink to="/" @click="refresh()">Home</NuxtLink> </a>
          </li>
          <!-- <li class="nav-item" @click="hideMenu($event)">
                        <a class="nav-link"> <NuxtLink to="/ContactUs"> Contact Us </NuxtLink> </a>
                    </li> -->
          <!-- <li class="nav-item" @click="hideMenu()">
                        <a class="nav-link"> <NuxtLink to="/Tab-View"> Tab View </NuxtLink> </a>
                    </li> -->
          <!-- <li class="nav-item" @click="hideMenu()">
                        <a class="nav-link"> <NuxtLink to="/add_property"> Post </NuxtLink> </a>
                    </li> -->
          <!-- <li class="nav-item" @click="hideMenu($event)">
                        <a class="nav-link"> <NuxtLink to="/ref"> Ref </NuxtLink> </a>
                    </li> -->
          <!-- <li class="nav-item" @click="hideMenu()">
                        <a class="nav-link"> <NuxtLink to="/samples"> Samples </NuxtLink> </a>
                    </li> -->
          <li class="nav-item" @click="hideMenu()">
            <a class="nav-link"> <NuxtLink to="/addPropertyBtn"> Add Property </NuxtLink> </a>
          </li>

          <!-- <li class="nav-item" @click="hideMenu($event)">
                        <a class="nav-link"> <NuxtLink to="/imagepost"> test </NuxtLink> </a>
                    </li> -->

          <li class="nav-item" @click="hideMenu()">
            <a class="nav-link"> <NuxtLink to="/myProperties">My Properties </NuxtLink> </a>
          </li>
          <li class="nav-item" @click="hideMenu()">
            <a class="nav-link"> <NuxtLink to="/all_tenents"> All Tenents </NuxtLink> </a>
          </li>


          <!-- <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Profile
                        </a>
                        <ul class="dropdown-menu bg-dark bg_purple">
                            <li @click="refresh()" style="display:none;">
                                <a class="nav-link"> <NuxtLink to="/MultiSlider"> Multi Slider </NuxtLink> </a>
                            </li>
                            <li v-for="(data, index) in profiles" :key="index" @click="hideMenu2($event)">
                                <a class="dropdown-item "> <NuxtLink :to="/profile/ + data"> {{ data }}</NuxtLink>
                                </a>
                            </li>
                        </ul>
                    </div> -->

        </ul>
        <ul class="navbar-nav ps-lg-5 ms-lg-5 pb-3">
          <li class="nav-item px-2" v-if="loginLink" @click="hideMenu()">
            <a class="dropdown-item"> <NuxtLink to="/login"> login</NuxtLink> </a>
          </li>
          <li class="nav-item px-2" v-if="register" @click="hideMenu()">
            <a class="dropdown-item"> <NuxtLink to="/register"> Register</NuxtLink> </a>
          </li>
          <li class="nav-item px-2">
            <a class="dropdown-item log_out" v-if="username"> {{ username }} ! </a>
          </li>
          <li class="nav-item px-2">
            <a class="dropdown-item log_out" @click="logOut(), refresh()" v-if="logout"> Logout </a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
// import { useRouter } from '#app'

// Router instance
const router = useRouter()

// Reactive State (formerly data)
const profiles = ref(['Principle', 'Director', 'Adimin'])
const loginLink = ref(true)
const logout = ref(true)
const register = ref(true)
const username = ref('')
const navLinks = ref(true)

// Methods
const hideMenu = () => {
  const smallNav = document.getElementById('navbarNav')
  if (smallNav) {
    smallNav.classList.remove('show')
  }
}

const hideMenu2 = () => {
  const smallNav2 = document.getElementById('navbarNav')
  if (smallNav2) {
    smallNav2.classList.remove('show')
  }
}

const refresh = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

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
    // router.push('/myProperties') 
    // Ensure 'HomePage' page/route exists
    loginLink.value = false
    logout.value = true
    register.value = false
    username.value = localUserParse
  }
})
</script>

<style>
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
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
    justify-content: space-between;
  }
}

@media (max-width:567px) {
  #navbarNav.navbar-collapse {
    position: absolute;
    border-radius: 0px 9px 9px 9px;
    background: rgb(96, 67, 157);
    background: linear-gradient(97deg, rgba(96, 67, 157, 1) 50%, rgba(126, 89, 203, 1) 100%);
    top: 55px;
    width: 100%;
    /* transform: translateX(-200px); */
    left: 0;
    text-align: left;
    padding: 0px 16px;
    z-index: 11;
  }

  .nav-item .nav-link {
    padding: 12px 0px;
    border-bottom: 1px solid #e7e7e715;
  }

  .show {
    transform: translateX(0px);
  }
}
</style>
