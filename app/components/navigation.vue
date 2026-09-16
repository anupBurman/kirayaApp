<template>
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
        </ul>
      </div>
    </div>
  </nav>
</template>