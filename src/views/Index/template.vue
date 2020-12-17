<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        {{params}}
      </div>
      <div class="layui-col-md4">
        <imooc-hotlist></imooc-hotlist>
        <imooc-ads></imooc-ads>
        <imooc-links></imooc-links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/Sidebar/HotList'
import Ads from '@/components/Sidebar/Ads'
import Links from '@/components/Sidebar/Links'
export default {
  name: 'Index',
  data() {
    return {
      params: ''
    }
  },
  watch: {
    $route(to, from) {
      this.params = to.params.catalog
    }
  },
  mounted() {
    this.params = this.$route.params.catalog
  },
  components: {
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links
  }
}
</script>

<style lang="scss" scoped>
</style>
