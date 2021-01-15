<template>
  <div class="layui-container flex">
    <div class="layui-row font pb3">确定更新账号为: {{obj.email}} 吗?</div>
    <div class="layui-row">
      <button type="button" class="layui-btn" :class="{'layui-btn-disabled': isSend}" @click="submit()">
        确定更新
      </button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api/user'
export default {
  name: 'Confirm',
  data() {
    return {
      obj: {
        email: '',
        key: ''
      },
      isSend: false
    }
  },
  mounted() {
    const obj = this.$route.query
    this.email = obj.email
    this.obj = {
      email: obj.email,
      key: obj.key
    }
  },
  methods: {
    submit() {
      updateUsername(this.obj).then(res => {
        if (res.code === 200) {
          this.isSend = true
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
