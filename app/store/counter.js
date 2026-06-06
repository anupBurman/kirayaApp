import { defineStore } from "pinia";
export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
        userdata: null,
        massage: "some Problem in Server",
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
                const response = await fetch('https://rentvent.store/api/all_users.php');
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
        }
    },
})
