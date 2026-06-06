<script setup>
defineProps(["id", "title", "body"]);

    //  const TextLimit = 60;
    //   return body.substring(0, characterLimit) + '...'
</script>
<template>
    <div class="row cardd bg-dark text-light p-4 mb-4">
        <div class="col-lg-4 px-0">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQaqt3enR7H9OL6By2o99l28OOXP9vIcpK3g&s" />
        </div>
        <div class="col-lg-8 px-0 ">
            <h3> {{ id }} {{ title }} </h3>

            <div>
                <p> {{ body.substr(0, 250) }}..... </p>
                <NuxtLink :to="'/posts/' + id ">
                    <button class="btn btn-danger"> Detail </button>
                </NuxtLink> 
            </div>

           

        </div>
    </div>

</template>
<style lang="css" scoped>
.cardd {
    border-radius: 8px;
}
</style>