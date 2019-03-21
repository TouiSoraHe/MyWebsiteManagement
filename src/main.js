import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'

import '@/plugins/vuetify.js'
import '@/plugins/vue-simplemde.js'
import '@/plugins/tips.js'
import '@/utils/permission.js'
import '@/utils/utils.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
