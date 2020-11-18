import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import Vuecookies from 'vue-cookies'

import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(vueFilterPrettyBytes)


Vue.config.productionTip = false

Vue.use(Vuecookies)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
