import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

// 添加评论
export const addComment = (data) => {
  return axios.post('/comments/addReply', { ...data })
}

// 获取文章中的评论列表
export const getComments = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/public/comments?' + qs.stringify(params), headers)
}
// 设置点赞
export const setHands = (params) => {
  return axios.get('/comments/hands?' + qs.stringify(params))
}
// 更新评论
export const updateComment = (data) => {
  return axios.post('/comments/update', { ...data })
}
// 采纳最佳评论
export const setCommentBest = (params) => {
  return axios.get('/comments/accept?' + qs.stringify(params))
}
