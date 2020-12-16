export const login = (loginInfo) => {
  return {}
}

export const register = (regInfo) => {
  return {}
}

export const forget = (option) => {
  return {}
}

export const getCode = (sid) => {
  return new Promise((resolve, reject) => {
    try {
      resolve('成功')
    } catch(err) {
      resolve('失败')
    }
  })
}
