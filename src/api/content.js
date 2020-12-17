import axios from '@/utils/request'
import qs from 'qs'

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
export const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}
