<template>
    <div class="container-fluid vh-100 px-0" style="background-image: url('/images/yyy.jpg');  background-size: cover; background-blend-mode: overlay;" >
     
        <div class="row p-4 ">
            <div class="col-lg-4"></div>
            <div class="col-lg-4 text-start p-5">
                <div>
                    <NuxtLink to="/add_property">
                        <button type="button" class="button-72 btn btn-default w-100" role="button">
                            Add Property/Building
                        </button>
                    </NuxtLink>
                </div>
            </div>
            <div class="col-lg-4">
            </div>
        </div>
        
    </div>
</template>

<script>
definePageMeta({
    layout: 'custom'
})

</script>

<style>
.container-fluid {
    box-sizing: border-box;
    overflow: hidden;
}
</style>
