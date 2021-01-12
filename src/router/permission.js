import router from './index'
import store from '@/store'
// import jwt from 'jsonwebtoken'

router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 路由变化 修改页面 title
    document.title = to.meta.title
  }
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  // const payload = jwt.decode(token)
  // console.log(payload)

  if (token !== '' && token !== null) {
    // 取localStorage里面缓存的token信息   用户信息
    store.commit('setToken', token)
    store.commit('setUserInfo', userInfo)
    store.commit('setIsLogin', true)
  }

  // to and from are Route Object,next() must be called to resolve the hook
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面进行区别
    if (isLogin) {
      // 已经登录的状态
      // 权限判断，meta元数据
      next()
    } else {
      // 未登录的状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
