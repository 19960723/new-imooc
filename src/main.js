import Vue from 'vue'
import App from './App.vue'
import router from './router/permission'
import store from './store'

import Alert from '@/components/modules/Alert/index.js'
Vue.use(Alert)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
