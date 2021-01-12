import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    sid: '',
    userInfo: {},
    token: '',
    isHide: false
  },
  mutations: {
    setSid(state, value) {
      state.sid = value
    },
    setUserInfo(state, value) {
      if (value === '') return
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setIsLogin(state, value) {
      state.isLogin = value
    },
    setToken(state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setHid(state, value) {
      state.isHide = value
    }
  },
  getters: {
    uid: (state) => state.userInfo ? state.userInfo._id : ''
  },
  actions: {
  },
  modules: {
  }
})
