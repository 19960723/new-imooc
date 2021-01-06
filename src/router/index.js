import Vue from 'vue'
import VueRouter from 'vue-router'
import content from './modules/content'
import login from './modules/login'
import user from './modules/user'

const Home = () => import(/** home page */ '@/views/Home')
const Index = () => import(/** Index page */ '@/views/Index')
const Template = () => import(/** template page */ '@/views/Index/template')
const NoFound = () => import(/** NoFound page */ '@/views/NoFound')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template
      }
    ]
  },
  ...content,
  ...login,
  ...user,
  {
    path: '/404',
    name: '404',
    component: NoFound,
    meta: {
      title: '404'
    }
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
