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
  },
  {
    path: '/center',
    component: () => import(/** center page */ '@/views/PerCenter'),
    meta: { requiresAuth: true },
    // linktActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'center',
        component: () => import(/** center page */ '@/views/PerCenter/Child/Center')
      },
      {
        path: 'set',
        component: () => import(/** center page */ '@/views/PerCenter/Child/Setting'),
        children: [
          {
            path: '',
            name: 'info',
            component: () => import(/** SetCom/info page */ '@/views/PerCenter/Child/SetCom/info')
          },
          {
            path: 'avatar',
            name: 'avatar',
            component: () => import(/** SetCom/avatar page */ '@/views/PerCenter/Child/SetCom/avatar')
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: () => import(/** SetCom/passwd page */ '@/views/PerCenter/Child/SetCom/passwd')
          },
          {
            path: 'account',
            name: 'account',
            component: () => import(/** SetCom/account page */ '@/views/PerCenter/Child/SetCom/account')
          }
        ]
      },
      {
        path: 'posts',
        component: () => import(/** center page */ '@/views/PerCenter/Child/Posts'),
        children: [
          {
            path: '',
            name: 'mypost',
            component: () => import(/** center page */ '@/views/PerCenter/Child/PostCom/mypost')
          },
          {
            path: 'collection',
            name: 'mycollection',
            component: () => import(/** center page */ '@/views/PerCenter/Child/PostCom/collection')
          }
        ]
      },
      {
        path: 'msg',
        name: 'msg',
        component: () => import(/** center page */ '@/views/PerCenter/Child/Msg')
      },
      {
        path: 'others',
        name: 'others',
        component: () => import(/** center page */ '@/views/PerCenter/Child/Others')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/** NoFound page */ '@/views/NoFound')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
