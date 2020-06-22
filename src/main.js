import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import Vuecookies from 'vue-cookies'
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBTEaBrtxi329vwEvYUlAl4pKEk9XJ9PjY",
  authDomain: "ros-cloud-cc711.firebaseapp.com",
  databaseURL: "https://ros-cloud-cc711.firebaseio.com",
  projectId: "ros-cloud-cc711",
  storageBucket: "ros-cloud-cc711.appspot.com",
  messagingSenderId: "175713596436",
  appId: "1:175713596436:web:72844d2b29a01ebaa76301",
  measurementId: "G-ZZXD7PLMCP"
}

firebase.initializeApp(firebaseConfig)


Vue.config.productionTip = false

Vue.use(Vuecookies)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
