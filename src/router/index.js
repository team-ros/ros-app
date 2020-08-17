import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Dashboard from "../views/Dashboard";
import Register from "../views/Register";
import PasswordRecovery from "../views/PasswordRecovery";
import Account from "../views/Account";
import Impressum from "../components/Impressum";
import Support from "../components/Support";

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
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/Impressum',
      name: 'Impressum',
      component: Impressum
    },
    {
      path: '/Support',
      name: 'Support',
      component: Support
    }
  ]

const router = new VueRouter({
  routes
})

export default router
