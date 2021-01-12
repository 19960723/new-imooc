import axios from '@/utils/request'
import qs from 'qs'

// 用户签到
export const userSign = () => {
  return axios.get('/user/fav')
}
// 更新用户基本信息
export const updateUserInfo = (data) => {
  return axios.post('/user/basic', data)
}
// 获取用户的基本信息
export const getInfo = (data) => {
  return axios.get('/user/info?' + qs.stringify(data))
}
// 修改密码
export const changePasswd = (data) => {
  return axios.post('/user/changePassword', { ...data })
}
// 获取用户发帖记录
export const getPostListByUid = (data) => {
  return axios.get('/user/mypost?' + qs.stringify(data))
}

// 删除发帖纪录
export const deletePostByUid = (id) => {
  return axios.get('/user/deletePost?' + qs.stringify(id))
}
