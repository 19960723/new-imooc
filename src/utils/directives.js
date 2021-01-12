// 全局指令定义
import store from '@/store'
export default {
  'hasRole': { // 组件级权限控制
    inserted: function (el, binding, vnode) {
      let role = store.state.userInfo.roles || ['user']
      if (!role.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
