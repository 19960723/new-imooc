<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <img :src="logo" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/">
            <i class="iconfont icon-jiaoliu"></i>交流
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="http://www.baidu.com">
            <i class="iconfont icon-iconmingxinganli"></i>案例
          </a>
        </li>
        <li class="layui-nav-item">
          <a href="http://www.layui.com/" target="_blank">
            <i class="iconfont icon-ui"></i>框架
          </a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isLogin">
          <li class="layui-nav-item">
            <a class="iconfont icon-touxiang layui-hide-xs" href="../user/login.html"></a>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'login'}">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{name: 'register'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a class="fly-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{userInfo.name}}</cite>
              <i class="layui-badge fly-badge-vip layui-hide-xs" v-show="userInfo.isVip">{{userInfo.isVip}}</i>
              <img :src="userInfo.avatar">
            </a>
            <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{'layui-show': isHover}">
              <dd><router-link :to="{name: 'info'}"><i class="layui-icon">&#xe620;</i>基本设置</router-link></dd>
              <dd><router-link :to="{name: 'msg'}"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</router-link></dd>
              <dd><router-link :to="{name: 'index'}"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</router-link></dd>
              <hr style="margin: 5px 0;">
              <dd><a href="javascript: void(0)" style="text-align: center;" @click="logout()">退出</a></dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      logo: require('@/assets/images/logo.png'),
      isHover: false,
      hoverTimeout: null
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
    userInfo() {
      return this.$store.state.userInfo || {
        name: '',
        avatar: '',
        isVip: '0'
      }
    }
  },
  methods: {
    show() {
      clearTimeout(this.hoverTimeout)
      this.hoverTimeout = setTimeout(() => {
        this.isHover = true
      }, 200)
    },
    hide() {
      clearTimeout(this.hoverTimeout)
      this.hoverTimeout = setTimeout(() => {
        this.isHover = false
      }, 500)
    },
    logout() {
      this.$confirm('确定退出吗?', () => {
        localStorage.clear()
        this.$store.commit('setToken', '')
        this.$store.commit('setUserInfo', '')
        this.$store.commit('setIsLogin', false)
        this.$router.push('/')
      }, () => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-logo {
  left: -15px;
  top: -10px;
  margin-left: 15px;
}
</style>
