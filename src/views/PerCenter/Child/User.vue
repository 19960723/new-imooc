<template>
  <div>
    <div class="fly-home fly-panel">
      <img :src="userInfo.avatar" alt="">
      <h1>
        {{userInfo.name}}
        <i class="iconfont icon-nan"></i>
        <i class="layui-badge fly-badge-vip">{{userInfo.isVip === '0' ? '非VIP': 'VIP' + userInfo.isVip}}</i>
      </h1>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
export default {
  name: 'Home',
  props: ['uid'],
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // 获取用户的基本信息
      getInfo({ uid: this.uid || 123 })
        .then(res => {
          if (res.code === 200) {
            this.userInfo = res.data
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
