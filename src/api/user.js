import axios from '@/utils/request'
import qs from 'qs'

// 用户签到
export const userSign = () => axios.get('/user/fav')
// 确认修改邮箱
export const updateUsername = (data) => axios.get('/public/resetEmail?' + qs.stringify(data))
// 更新用户基本信息
export const updateUserInfo = (data) => axios.post('/user/basic', data)
// 获取用户的基本信息
export const getInfo = (data) => axios.get('/user/info?' + qs.stringify(data))
// 修改密码
export const changePasswd = (data) => axios.post('/user/changePassword', { ...data })
// 获取用户发帖记录
export const getPostListByUid = (data) => axios.get('/user/mypost?' + qs.stringify(data))
// 删除发帖纪录
export const deletePostByUid = (id) => axios.get('/user/deletePost?' + qs.stringify(id))
// 设置收藏 & 取消收藏
export const addCollect = (data) => axios.get('/user/setCollect?' + qs.stringify(data))
// 获取收藏列表
export const getCollect = (data) => axios.get('/user/collect?' + qs.stringify(data))
