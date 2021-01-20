import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes'
import VueI18n from 'vue-i18n'
import messages from './lang'

Vue.use(VueI18n)
Vue.use(vueFilterPrettyBytes)

export const i18n = new VueI18n({
  //locale: navigator.language,
  locale: 'de',
  messages
});

Vue.config.productionTip = false


new Vue({
  vuetify,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
