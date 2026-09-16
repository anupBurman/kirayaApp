import { defineStore } from "pinia";
export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
        userdata: null,
        massage: "some Problem in Server",

        profile: null,
        loading: 'loading...',
        error: null,


    }),
    actions: {
        // since we rely on `this`, we cannot use an arrow function
        increment() {
            this.count++;
            // this.count > 6 ? console.log('Limit corossed') : console.log(this.count++)
        },
        randomizeCounter() {
            this.count = Math.round(100 * Math.random())
            // this.count == 78 ? console.log('You achieved your desired Number') : this.count = Math.round(100 * Math.random());
        },

        async getUser(id) {
            try {
                // const response = await fetch('https://jsonplaceholder.typicode.com/commentstss/3');
                const response = await fetch('http://localhost/rental_app/api/all_users.php');
                this.userdata = await response.json();
                console.log(response)

                if (!response.ok) {
                    const badRequest = "something went wrong";
                    this.userdata = badRequest.json();

                    console.log('qwery failed or data not found')
                }

            } catch {
                // throw createError ({
                //     statusCode: 500,
                //     statusMessage: 'Unable to read data'
                // })

            }
        },

        async fetchUserProfile(userId) {
            this.loading = true;
            this.error = null;

            try {
                // ✅ Use $fetch for global data fetching inside actions
                const data = await $fetch('http://localhost/rental_app/api/all_users.php');
                this.profile = data;
            } catch (err) {
                this.error = err.message || 'Failed to load user';
            } finally {
                this.loading = '';
            }

           
                // const {data, error, pending} = await useFetch('http://localhost/rental_app/api/all_users.php')
                // this.profile = data.value
                // console.log(this.profile)
            

        },


    },

})
