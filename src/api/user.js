// import store from '@/store'
// const headers = {
//   Authorization: 'Bearer ' + store.state.token,
//   'Content-Type': 'application/json'
// }
export const userSign = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve('成功')
    } catch {
      resolve('失败')
    }
  })
}

export const updateUserInfo = (data) => {
  return new Promise((resolve, reject) => {
    try {
      resolve('成功')
    } catch {
      resolve('失败')
    }
  })
}
