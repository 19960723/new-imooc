<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
            <span @click="choose(0)">
              <i class="iconfont icon-yxj-expression"></i>
            </span>
            <span @click="choose(1)">
              <i class="iconfont icon-tupian"></i>
            </span>
            <span @click="choose(2)">
              <i class="iconfont icon-lianjie"></i>
            </span>
            <span class="quote" @click="choose(3)">”</span>
            <span @click="choose(4)">
              <i class="iconfont icon-emwdaima"></i>
            </span>
            <span @click="addHr()">hr</span>
            <span @click="choose(5)">
              <i class="iconfont icon-yulan1"></i>
            </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @focus="focusEvent()"
          @blur="blurEvent()"
        ></textarea>
      </div>
    </div>
    <div ref="modal">
      <face :isShow="current === 0" @closeEvent="closeModal()" @addEvent="addFace"></face>
      <img-upload :isShow="current === 1" @closeEvent="closeModal()" @addEvent="addAvatar"></img-upload>
      <link-add :isShow="current === 2" @closeEvent="closeModal()" @addEvent="addLink"></link-add>
      <quote :isShow="current === 3" @closeEvent="closeModal()" @addEvent="addQuote"></quote>
      <code-input :isShow="current === 4" :width="codeWidth" :height="codeHeight" @closeEvent="closeModal()" @addEvent="addCode"></code-input>
      <preview :isShow="current === 5" @closeEvent="closeModal()" :content="content"></preview>
    </div>
  </div>
</template>

<script>
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import Quote from './Quote'
import CodeInput from './Code'
import Preview from './Preview'

export default {
  name: 'Edit',
  data() {
    return {
      current: '',
      content: '',
      pos: 0,
      codeHeight: 200,
      codeWidth: 400
    }
  },
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Quote,
    CodeInput,
    Preview
  },
  props: ['initContent'],
  watch: {
    initContent(newVal, oldVal) {
      this.content = newVal
    }
  },
  updated() {
    this.$emit('changeContent', this.content)
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60
    this.codeHeight = this.$refs.textEdit.offsetHeight - 60
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
    })
  },
  methods: {
    choose(index) {
      this.current = index
    },
    focusEvent() {
      this.getPos()
    },
    blurEvent() {
      this.getPos()
    },
    // 计算光标的当前位置
    getPos() {
      let cursorPos = 0
      const editDom = this.$refs.textEdit
      if (document.selection) {
        // IE
        const selectRange = document.selection.createRange()
        selectRange.moveStart('character', -editDom.value.length)
        cursorPos = selectRange.text.length
      } else if (editDom.selectionStart || editDom.selectionStart === '0') {
        cursorPos = editDom.selectionStart
      }
      this.pos = cursorPos
    },
    closeModal() {
      this.current = ''
    },
    // 添加表情
    addFace(key) {
      const insertContent = ` face${key}`
      this.pos += insertContent.length
      this.insert(insertContent)
    },
    // 添加 hr
    addHr() {
      this.insert('\n[hr]')
      this.pos += 5
    },
    // 添加图片链接
    addAvatar(url) {
      const insertContent = ` img[${url}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加链接
    addLink(link) {
      const insertContent = ` a(${link})[${link}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加引用
    addQuote(item) {
      const insertContent = ` \n[quote]\n${item}\n[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addCode(code) {
      const insertContent = ` \n[pre]\n${code}\n[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    handleBodyClick(e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件, 改变isShow
      // 判断是否点击到非控制Icon以外 + 本组件的地方
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
        // 点击到icons 和 modal 组件外 触发关闭
        this.closeModal()
      }
    },
    insert(val) {
      if (typeof this.content === 'undefined') {
        return
      }
      const tmp = this.content.split('') // 把字符串分割成数组
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('') // 把数组中的所有元素放入一个字符串
    }
  },
  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
.fly-editor{
  height: 260px;
}
</style>
