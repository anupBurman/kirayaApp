<template>
  <div class="container-fluid px-0 footer">
    <ul v-if="footerLinks" class="d-flex justify-content-between align-items-center">
      <li>
        <a @click="goBack" class="cursor-pointer">
          <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
          <!-- <h6>Back</h6> -->
        </a>
      </li>
      <li>
        <!-- NuxtLink replaces router-link -->
        <NuxtLink to="/">
          <i class="fa fa-home" aria-hidden="true"></i>
          <!-- <i class="bi bi-house-heart-fill"></i> -->
          <!-- <h6>Home</h6> -->
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/addProperty">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
          <!-- <i class="bi bi-plus-square-dotted"></i> -->
          <!-- <h6>Add</h6> -->
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Local state
const footerLinks = ref(true)

// Nuxt routing composables
const router = useRouter()
const route = useRoute()

// Navigation logic
const goBack = () => {
  if (route.path !== '/') {
    router.back()
  }
}

// Browser-only execution for localStorage
onMounted(() => {
  const localUser = localStorage.getItem('userinfo')
  
  if (!localUser) {
    footerLinks.value = false
  } else {
    try {
      const localUserParse = JSON.parse(localUser)
      console.log(localUserParse)
    } catch (error) {
      console.error('Error parsing userinfo from localStorage:', error)
    }
  }
})
</script>

<style scoped>
/* Added scoped to protect global styles, cursor pointer for back anchor */
.cursor-pointer {
  cursor: pointer;
}
.footer {
  position: fixed;
  bottom: 0px;
}
.footer ul {
  padding: 6px 16px;
  margin-bottom: 0px;
  background-color: #333;
  color: #fff;
}
.footer ul h6 {
  font-size: 12px;
  margin-bottom: 0px;
}
.footer ul li {
  list-style: none;
  font-size: 12px;
}
.footer ul li i {
  color: #ff944d;
  font-size: 1.4rem;
}
</style>
