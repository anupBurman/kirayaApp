// plugins/sweetalert2.client.ts
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swal: Swal
    }
  }
})