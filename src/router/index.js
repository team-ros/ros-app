import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Dashboard from "../views/Dashboard";
import Register from "../views/Register";
import PasswordRecovery from "../views/PasswordRecovery";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
    path: '/Login',
    name: 'Login',
    component: Login
  },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/PasswordRecovery',
      name: 'PasswordRecovery',
      component: PasswordRecovery
    }
  ]

const router = new VueRouter({
  routes
})

export default router
