<template>
  <div class="layui-container">
    <imooc-panel></imooc-panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{page.title}}</h1>
          <div class="fly-detail-info">
            <span class="layui-badge layui-bg-green fly-detail-column" v-if="page.catalog === 'ask'" >提问</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'advise'" >建议</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'discuss'" >交流</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'share'" >分享</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'logs'" >动态</span>
            <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'notice'" >公告</span>
            <span class="layui-badge" style="background-color: #999;" v-if="page.isEnd === '0'">未结</span>
            <span class="layui-badge" style="background-color: #5fb878;" v-else>已结</span>
            <span class="layui-badge layui-bg-black" v-if="page.isTop === '1'">置顶</span>
            <span class="layui-badge" :class="tag.class" v-for="(tag,index) in page.tags" :key="'tags' + index" >{{tag.name}}</span>
            <div>
              <!-- 这里需要权限控制 -->
            </div>
            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i>
                {{page.answer}}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i>
              {{page.reads}}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="javascript:;">
              <img :src="page.uid ? page.uid.avatar : 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'" />
            </a>
            <div class="fly-detail-user">
              <a href="javascript:;" class="fly-link">
                <cite>{{page.uid ? page.uid.username : 'imooc'}}</cite>
                <i
                  class="layui-badge fly-badge-vip mr1"
                  v-if="page.uid && page.uid.isVip !== '0'? page.uid.isVip : false"
                >VIP{{page.uid.isVip}}</i>
              </a>
              <span>{{page.created | moment}}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <router-link
              class="layui-btn layui-btn-sm jie-admin"
              :to="{name: 'edit', params: {tid: tid , page: page}}"
              v-show="page.isEnd === '0' && page.uid._id === user._id"
            >编辑</router-link>
            <a
              class="layui-btn layui-btn-sm jie-admin-collect"
              :class="{'layui-btn-primary': page.isFav}"
              @click.prevent="setCollect()"
            >{{page.isFav ? '取消收藏': '收藏'}}</a>
          </div>
           <div class="detail-body photos" v-html="content"></div>
        </div>
        <!-- 回帖相关内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend style="margin-left: 0">回帖</legend>
          </fieldset>
          <ul class="jieda" id="jieda">
            <!-- 无数据时 -->
            <li class="fly-none">消灭零回复</li>
          </ul>
          <div class="layui-form layui-form-pane">
            <validation-observer ref="observer" v-slot="{ validate }">
              <imooc-edit @changeContent="addContent" :initContent="editInfo.content"></imooc-edit>
              <div class="layui-form-item">
                <validation-provider name="code" ref="codefield" rules="required|length:4" v-slot="{errors}">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="code"
                        v-model="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class>
                      <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" type="button" @click="validate().then(submit)">提交回复</button>
              </div>
            </validation-observer>
          </div>
        </div>
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
import Panel from '@/components/Panel'
import HotList from '@/components/Sidebar/HotList'
import Ads from '@/components/Sidebar/Ads'
import Links from '@/components/Sidebar/Links'
import Editor from '../modules/Editor'
import { getDetail } from '@/api/content'
import { escapeHtml } from '@/utils/escapeHtml'
import CodeMix from '@/mixin/code'

export default {
  name: 'Detail',
  mixins: [CodeMix],
  data() {
    return {
      page: {},
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
    }
  },
  props: ['tid'],
  computed: {
    user() {
      return this.$store.state.userInfo
    },
    content() {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    }
  },
  components: {
    'imooc-panel': Panel,
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-edit': Editor
  },
  mounted() {
    this.getPostDetail()
  },
  methods: {
    getPostDetail() {
      getDetail({ tid: this.tid }).then(res => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList() {

    },
    addContent(val) {
      this.editInfo.content = val
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return
      // 用户未登陆
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }

      // 用户禁言状态判断
      const user = this.$store.state.userInfo

      if (user.status !== '0') {
        this.$pop('shake', '用户已经禁言，请联系管理员')
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid

      // 获取评论用户的信息: 图片、昵称、vip
      const cuid = {
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
        isVip: user.isVip
      }
      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        // const obj = { ...this.editInfo }
        // delete obj['item']
        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) {
          this.$pop('shake', '确定编辑了内容~~~')
          return
        }
        // 更新评论
        console.log(this.editInfo)
        console.log(cuid)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.fly-admin-box {
  margin-left: 0;
  margin-top: 15px;
}

.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
