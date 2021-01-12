const Login = () => import(/** login page */ '@/views/Login')
const Register = () => import(/** register page */ '@/views/Register')
const Forget = () => import(/** forget page */ '@/views/Forget')
const Confirm = () => import(/** confirm page */ '@/views/Confirm')
const Reset = () => import(/** reset page */ '@/views/Reset')

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册'
    },
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') { // 必须从 /login界面 才能跳到 /register界面
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget,
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm,
    meta: {
      title: '邮箱变更'
    }
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset,
    meta: {
      title: '重置'
    }
  }

]
