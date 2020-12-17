<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a href class="layui-this">综合</a>
      <span class="fly-mid"></span>
      <a href>未结</a>
      <span class="fly-mid"></span>
      <a href>已结</a>
      <span class="fly-mid"></span>
      <a href>精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a href class="layui-this">按最新</a>
        <span class="fly-mid"></span>
        <a href>按热议</a>
      </span>
    </div>
    <list-item @nextPage="nextPage" :lists="lists" :isShow="true" ></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getList } from '@/api/content'
export default {
  name: 'List',
  data() {
    return {
      catalog: '',
      sort: 'created',
      page: 0,
      limit: 20,
      status: '',
      tag: '',
      lists: []
    }
  },
  mounted() {
    this._getLists()
  },
  methods: {
    _getLists() {
      const options = {
        catalog: this.catalog, // 帖子分类
        isTop: 0, // 是否置顶
        sort: this.sort, // 文章排序
        page: this.page, // 分页
        limit: this.limit, // 每页的数量
        status: this.status, // 文章状态
        tags: this.tag
      }
      getList(options).then(res => {
        if (res.code === 200) {
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch(err => {
        if (err) {
          this.$alert(err.msg)
        }
      })
    },
    nextPage() {
      this.page++
      this._getLists()
    }
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>
</style>
