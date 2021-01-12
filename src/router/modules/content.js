// 帖子内容
const Add = () => import(/** Add page */ '@/components/Contents/Add.vue')
const Edit = () => import(/** edit page */ '@/components/Contents/Edit.vue')
const Detail = () => import(/** detail page */ '@/components/Contents/Detail.vue')

export default [
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: { title: '发表文章', requiresAuth: true }
  },
  {
    path: '/edit/:tid',
    name: 'edit',
    props: true,
    component: Edit,
    meta: { requiresAuth: true }
  },
  {
    path: '/detail/:tid',
    name: 'detail',
    props: true,
    component: Detail,
    meta: {
      // 通过后台接口动态添加到路由addRoutes
      types: ['get', 'add', 'delete']
    }
  }
]
