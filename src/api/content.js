import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

// 友情链接
export const getLinks = () => axios.get('/public/links')
// 温馨提醒
export const getTips = () => axios.get('/public/tips')
// 本周热议
export const getTop = () => axios.get('/public/topWeek')
// 读取文章列表
export const getList = (options) => axios.get('/public/list?' + qs.stringify(options))
// 更新上传图片
export const uploadImg = (formData) => axios.post('/content/upload', formData)
// 添加文章
export const addPost = (data) => axios.post('/content/add', { ...data })
// 更新文章, 编辑帖子
export const updatePost = (data) => axios.post('/content/update', { ...data })

// 获取详情页
export const getDetail = (id) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/public/content/detail?' + qs.stringify(id), headers)
}
