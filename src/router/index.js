import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import(/** index page */ '@/views/Index')
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: () => import(/** template page */ '@/views/Index/template')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/** login page */ '@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/** register page */ '@/views/Register')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import(/** forget page */ '@/views/Forget')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
