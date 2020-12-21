<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a @click.prevent="search()" :class="{'layui-this': status === '' && tag === ''}">综合</a>
      <span class="fly-mid"></span>
      <a @click.prevent="search(0)" :class="{'layui-this': status === '0'}">未结</a>
      <span class="fly-mid"></span>
      <a @click.prevent="search(1)" :class="{'layui-this': status === '1'}">已结</a>
      <span class="fly-mid"></span>
      <a @click.prevent="search(2)" :class="{'layui-this': status === '' && tag === '精华'}">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a @click.prevent="search(3)" :class="{'layui-this': sort === 'created'}">按最新</a>
        <span class="fly-mid"></span>
        <a @click.prevent="search(4)" :class="{'layui-this': sort === 'answer'}">按热议</a>
      </span>
    </div>
    <list-item @nextPage="nextPage" :isEnd="isEnd" :lists="lists" :isShow="true" ></list-item>
  </div>
</template>

<script>
import listMix from '@/mixin/list'
import ListItem from './ListItem'
export default {
  name: 'List',
  mixins: [listMix],
  watch: {
    current(newVal, oldVal) {
      this.init()
    },
    '$route'(newVal, oldVal) {
      this.init()
    }
  },
  methods: {
    search(val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      switch (val) {
        // 未结贴
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 查询"精华"标签
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 按照时间查询
        case 3:
          this.sort = 'created'
          break
        // 按照评论数去查询
        case 4:
          this.sort = 'answer'
          break
        // 综合查询
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>
.fly-panel-title {
  a{
    cursor: pointer;
  }
}
</style>
