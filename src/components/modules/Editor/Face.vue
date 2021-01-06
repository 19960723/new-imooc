<template>
  <transition name="fade">
    <div class="layui-layer-tips layui-edit-face edit-content" v-show="isShow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li class="item" v-for="(value, key) in lists" :key="key" @click="handleFaceClick(key)">
            <img :src="value" alt="" :title="key">
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from '@/assets/js/face'
export default {
  name: 'Face',
  props: ['isShow'],
  data() {
    return {
      lists: faces
    }
  },
  methods: {
    handleFaceClick(key) {
      this.$emit('addEvent', key)
      this.$emit('closeEvent')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
