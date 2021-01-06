// 帖子内容
const Add = () => import(/** Add page */ '@/components/Contents/Add.vue')

export default [
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: { title: '发表文章' }
  }
]
