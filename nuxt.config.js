export default {
  head: {
    title: 'crud-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'font', type: 'font', href: 'https://fonts.googleapis.com/css?family=Roboto|Varela+Round' },
      { rel: 'css', type: 'text', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css' },
      { rel: 'material', type: 'icons', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'minCss', type: 'text', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
     
    ]
  },
  components: true,
  publicRuntimeConfig:{
    apiURL: process.env.API_URL,
    token: process.env.API_TOKEN,
    axios: {
      baseURL: process.env.API_URL
    },
    authAPI: process.env.AUTH_USER_API
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/google-fonts',
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: 'auth'
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
  ],
  module: {
    rules: [
      {test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader'}
    ]
  },
};
