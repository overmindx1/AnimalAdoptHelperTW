
import fs from 'fs'
import path from 'path'
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '浪浪領養資訊小幫手',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel : 'stylesheet' , href : "https://fonts.googleapis.com/css?family=Noto+Sans+TC"}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'vuesax/dist/vuesax.css'
  ],
  pwa: {
    manifest: {
      name: '浪浪認養資訊小幫手',
      short_name: '浪浪認養資訊',
      start_url : '/',
      lang: 'zh',
      display: 'standalone',
      description: '使用農委會開放資料的浪浪認養資訊',
      background_color : '#dfe6e9',
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/helper',
    {
      src: '@/plugins/sw.js',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  ///etc/letsencrypt/archive/flv.hapopo.com
  //ssl_certificate      /etc/nginx/ssl/fullchain1.pem;
  // ssl_certificate_key  /etc/nginx/ssl/privkey1.pem;
  // server : {
  //   https: {
  //     key: fs.readFileSync(path.resolve('/etc/letsencrypt/archive/flv.hapopo.com/privkey1.pem')),
  //     cert: fs.readFileSync(path.resolve('/etc/letsencrypt/archive/flv.hapopo.com/fullchain1.pem'))
  //   }
  // }
}
