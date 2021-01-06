<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view/>
    <imooc-footer></imooc-footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/styles/global.css";
@import "assets/styles/utilities.scss";
@import 'assets/images/layui-layer/layer.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscal;
}
</style>
