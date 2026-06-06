<template>
    <Topbar />
    <navigation />
    <div class="hero-img2 px-5">
        <h1> custom layout Hero Image </h1>
    </div>
    <slot />
</template>
<style lang="css"  >
.hero-img2 {
    height: 100px;
    background-color: rgb(160, 95, 111);
}
</style>