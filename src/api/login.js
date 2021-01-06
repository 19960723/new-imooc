import axios from '@/utils/request'

/**
 * 登录接口
 * @param {*} loginInfo 用户登录信息
 */
export const login = (loginInfo) => {
  return axios.post('/user/login', { ...loginInfo })
}

/**
 * 注册接口
 * @param {*} regInfo 用户注册信息
 */
export const register = (regInfo) => {
  return axios.post('/user/register', { ...regInfo })
}
/**
 * 找回密码接口
 * @param {*} option 用户信息 (邮箱, 验证码)
 */
export const forget = (option) => {
  return axios.post('/user/forget', { ...option })
}
/**
 * 获取图形验证码
 * @param {*} sid 随机串
 */
export const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
