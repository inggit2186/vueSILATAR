import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
const path = require("path");
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          const chunkMap = [
            ['vue3-apexcharts', 'apexcharts'],
            ['socket.io-client', 'socket'],
            ['sweetalert2', 'sweetalert2'],
            ['bootstrap-vue-next', 'bootstrap-vue'],
            ['bootstrap/dist', 'bootstrap'],
            ['bootstrap/', 'bootstrap'],
            ['ant-design-vue', 'antd'],
            ['@fullcalendar', 'fullcalendar'],
            ['handsontable', 'handsontable'],
            ['firebase', 'firebase'],
            ['@fancyapps/ui', 'fancyapps'],
            ['vue-cool-lightbox', 'cool-lightbox'],
            ['vue-easy-lightbox', 'easy-lightbox'],
            ['vue-cryptojs', 'cryptojs'],
            ['vue-signature-pad', 'signature-pad'],
            ['vue-star-rating', 'star-rating'],
            ['@vuepic/vue-datepicker', 'vue-datepicker'],
            ['@vueform/slider', 'slider'],
            ['vue3-carousel', 'vue3-carousel'],
            ['vue-carousel-variable-width', 'vue-carousel-varwidth'],
            ['vue-carousel', 'vue-carousel'],
            ['vue-select', 'vue-select'],
            ['bottom-navigation-vue', 'bottom-navigation'],
            ['vue-croppie', 'vue-croppie'],
            ['aos', 'aos'],
            ['axios', 'axios'],
            ['vue-router', 'vue-core'],
            ['vuex', 'vue-core'],
            ['@vue/compat', 'vue-core'],
            ['/vue/', 'vue-core'],
          ]

          for (const [needle, chunkName] of chunkMap) {
            if (id.includes(needle)) {
              return chunkName
            }
          }

          return 'vendor'
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  base: '/v2/',
  assetsInclude: 'assets/'
})
