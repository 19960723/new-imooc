<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="'listitem-' + index">
        <router-link class="fly-avatar" :to="{name: 'home', params: { uid: item.uid._id }}">
          <img
            :src="item.uid.avatar"
            alt="a"
          />
        </router-link>
        <h2>
          <a class="layui-badge">{{item.catalog}}</a>
          <router-link :to="{name: 'detail', params: {tid: item._id}}">{{item.title}}</router-link>
        </h2>
        <div class="fly-list-info">
          <router-link :to="{name: 'home', params: { uid: item.uid._id }}" link>
            <cite>{{item.uid.username}}</cite>
            <i class="layui-badge fly-badge-vip" v-if="item.uid.isVip > 0">VIP{{item.uid.isVip}}</i>
          </router-link>
          <span>{{item.created | moment}}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
            <i class="iconfont icon-kiss"></i> {{item.fav}}
          </span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status !== 0">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{item.answer}}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span class="layui-badge" v-for="itemY in item.tags" :key="itemY.name" :class="itemY.class">{{itemY.name}}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a @click.prevent="more()" class="laypage-next">更多求解</a>
      </div>
      <div class="nomore gray" v-else >没有更多了</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    },
    lists: {
      default: () => [],
      type: Array
    }
  },
  computed: {
    items() {
      this.lists.map(item => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      return this.lists
    }
  },
  methods: {
    more() {
      this.$emit('nextPage')
    }
  }
}
</script>

<style lang="scss" scoped>
.laypage-next{
  cursor: pointer;
}
.nomore{
  padding: 10px 0;
}
</style>
