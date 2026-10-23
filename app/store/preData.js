import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";



export const useDataStore = defineStore('preData', {
    state: () => ({

        noProp: '',
        response: [],
        loader: false,
        successMsg: '',
        usermail: '',

        massage: "some Problem in Server",
        // apiBasePath: 'http://localhost/rental_app/api/',
        apiBasePath: 'https://rent.free.je/api/',
        loading: 'loading...',
        error: null,

        products: [
            { id: 1, name: 'iPhone', category: 'mobile' },
            { id: 2, name: 'MacBook', category: 'laptop' },
            { id: 3, name: 'Samsung', category: 'mobile' }
        ]


    }),
    // getters: {
    //     mobileProducts: (state) =>
    //         state.response.filter(product => product.id === 34)
    // },
    actions: {

        async getProperties() {
            const router = useRouter();
            const localUser = localStorage.getItem("userinfo");
            if (localUser) {
                this.usermail = JSON.parse(localUser);
            }
            this.loader = true;
            try {
                // $fetch automatically parses JSON and throws errors for non-2xx responses
                const data = await $fetch('http://localhost/rental_app/api/my_properties.php', {
                    method: 'POST',
                    body: {
                        user_email: this.usermail,
                        // id: id.value
                    }
                });

                // If execution reaches here, the response status was 2xx
                this.loader = false;
                this.response = data;
                this.noProp = data.length == 0 ? this.noProp = true : this.noProp = '';

                // this.propCity = data.c
                // console.log(data.length)
            } catch (error) {
                this.loader = false; // Ensures loader turns off on failure
                console.error("Something went wrong:", error);
                // router.push({ path: '/error_page/' });
            }
        },

    },
    



})
