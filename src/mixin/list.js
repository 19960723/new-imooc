import { getList } from '@/api/content'

export default {
  data() {
    return {
      isEnd: false, // 是否还有文章数据(到底)
      isTop: 0, // 是否置顶
      catalog: '', // 帖子分类
      sort: 'created', // 文章排序
      page: 0, // 分页
      limit: 20, // 每页的数量
      status: '', // 文章状态
      tag: '', // 文章标签 (精华)
      isRepeat: false, // 阻止多次点击请求
      lists: [], // 文章列表
      current: '' // 文章数据筛选 watch 监听
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.page = 0
      this.lists = []
      this.isEnd = false
      const catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this._getLists()
    },
    _getLists() {
      if (this.isRepeat) return // 阻止多次点击请求
      if (this.isEnd) return // 判断是否还有文章数据
      this.isRepeat = true
      const options = {
        catalog: this.catalog, // 帖子分类
        isTop: this.isTop, // 是否置顶
        sort: this.sort, // 文章排序
        page: this.page, // 分页
        limit: this.limit, // 每页的数量
        status: this.status, // 文章状态
        tags: this.tag
      }
      getList(options).then(res => {
        // 加一个请求锁, 防止用户多次点击, 等待数据返回, 再打开
        this.isRepeat = false
        if (res.code === 200) {
          // 判断 返回数据的长度, 如果小于指定请求的数量, 则是最后一页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch(err => {
        if (err) {
          this.$alert(err.message)
        }
      })
    },
    nextPage() {
      this.page++
      this._getLists()
    }
  }
}
