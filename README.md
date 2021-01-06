# new-imocc

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 点

router-link active

linkExactActiveClass: 'active 类'  // 严格匹配
linktActiveClass: 'active 类'

子路由匹配时   active 和 路由地址匹配


# js 插件

uuid 
vee-validate

# Dom 方法

contains // 判断dom元素是否被包含

# 交互实现

modal(模态框)
  1. 在该组件(mounted)监听 body的点击事件
  2. 在该组件(beforeDestroy) 销毁监听
  3. 判断点击的是否在模态框内 或指定的视图 (Dom contains(e.target()) 比较dom是否包含) , 如果不是则关闭模态框(closeModal)