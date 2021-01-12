import axios from '@/utils/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
export const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}
// 更新上传图片
export const uploadImg = (formData) => {
  return axios.post('/content/upload', formData)
}
// 添加文章
export const addPost = (data) => {
  return axios.post('/content/add', { ...data })
}
// 更新文章, 编辑帖子
export const updatePost = (data) => {
  return axios.post('/content/update', { ...data })
}

// 获取详情页
export const getDetail = (id) => {
  return axios.get('/public/content/detail?' + qs.stringify(id))
}
