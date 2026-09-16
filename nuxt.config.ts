// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    // ...
    '@pinia/nuxt',
  ],
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
       htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'stylesheet', href: '/bootstrap_5.3.8/bootstrap.min.css' }
      ],

      script: [{ src: '/bootstrap_5.3.8/bootstrap.bundle.min.js' }],
    },
  },
})
