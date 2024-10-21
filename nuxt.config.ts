export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },
  auth: {
    baseURL: "/api",
    isEnabled: true,
    globalAppMiddleware: true,
    disableServerSideAuth: false,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/auth/login", method: "post" },
        signUp: { path: "/auth/register", method: "post" },
        getSession: { path: "/user" },
      },
      pages: {
        login: "/login",
      },
    },
    sessionRefresh: {
      enablePeriodically: 10000,
      enableOnWindowFocus: false,
    },
  },
});
