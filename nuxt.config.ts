// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint', 
    '@nuxt/icon', 
    '@nuxt/image',
    '@vuestic/nuxt',
    '@pinia/nuxt'
  ],
  
  future: {
    compatibilityVersion: 4
  },
  runtimeConfig: {
    dbPath: ''
  },
  vuestic: {
    config: {
      
    }
  },
})