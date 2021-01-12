<template>
  <!-- 上传头像 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="avatar" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </label>
        <input type="file" id="avatar" name="file" accept="image/png, image/gif, image/jpeg" @change="upload" />
        <img
          :src="avatar"
        />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/content'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'Avatar',
  data() {
    return {
      avatar: this.$store.state.userInfo && this.$store.state.userInfo.avatar ? this.$store.state.userInfo.avatar : 'https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
    }
  },
  methods: {
    upload(e) {
      const file = e.target.files
      const formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      uploadImg(this.formData).then(res => {
        if (res.code === 200) {
          this.avatar = res.data
          // 更新用户的基本资料 => updateUserInfo
          updateUserInfo({ avatar: this.avatar })
            .then(res => {
              if (res.code === 200) {
                // 修改全局的 store 内的用户基础信息
                const user = this.$store.state.userInfo
                this.$set(this.$store.state.userInfo, 'avatar', this.avatar)
                this.$store.commit('setUserInfo', user)
                this.$alert('图片上传成功')
              }
            })
          document.getElementById('avatar').value = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#avatar{
  display: none;
}
</style>
