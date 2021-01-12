const PerCenter = () => import(/** center page */ '@/views/PerCenter')
const Center = () => import(/** childCenter page */ '@/views/PerCenter/Child/Center')
// 设置中心
const Setting = () => import(/** center page */ '@/views/PerCenter/Child/Setting')
const SetComInfo = () => import(/** SetCom/info page */ '@/views/PerCenter/Child/SetCom/info')
const SetComAvatar = () => import(/** SetCom/avatar page */ '@/views/PerCenter/Child/SetCom/avatar')
const SetComPasswd = () => import(/** SetCom/passwd page */ '@/views/PerCenter/Child/SetCom/passwd')
const SetComAccount = () => import(/** SetCom/account page */ '@/views/PerCenter/Child/SetCom/account')
// 我的帖子
const Posts = () => import(/** Posts page */ '@/views/PerCenter/Child/Posts')
const PostComMyPost = () => import(/** mypost page */ '@/views/PerCenter/Child/PostCom/mypost')
const PostComCollection = () => import(/** collection page */ '@/views/PerCenter/Child/PostCom/collection')
const Msg = () => import(/** msg page */ '@/views/PerCenter/Child/Msg')
const Others = () => import(/** Others page */ '@/views/PerCenter/Child/Others')

const User = () => import(/** User page */ '@/views/PerCenter/Child/User')

export default [
  {
    path: '/center',
    component: PerCenter,
    meta: { requiresAuth: true },
    linktActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'center',
        component: Center
      },
      {
        path: 'set',
        component: Setting,
        meta: { title: '设置中心' },
        children: [
          {
            path: '',
            name: 'info',
            component: SetComInfo
          },
          {
            path: 'avatar',
            name: 'avatar',
            component: SetComAvatar
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: SetComPasswd
          },
          {
            path: 'account',
            name: 'account',
            component: SetComAccount
          }
        ]
      },
      {
        path: 'posts',
        component: Posts,
        meta: { title: '我的帖子' },
        children: [
          {
            path: '',
            name: 'mypost',
            component: PostComMyPost
          },
          {
            path: 'collection',
            name: 'mycollection',
            component: PostComCollection
          }
        ]
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg,
        meta: { title: '我的消息' }
      },
      {
        path: 'others',
        name: 'others',
        component: Others,
        meta: { title: '其它设置' }
      }
    ]
  },
  {
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  }
]
