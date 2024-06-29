//从vue中引出createApp创建vue实例
import { createApp } from 'vue'
import App from './App.vue'
//引入路由
import router from "./router/index.js"
//引入这个less文件，这个文件在项目的资源中获取，按照路径放置好
import "./assets/less/index.less"
//引入ElementPlusIconsVue 中所有的组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from './api/api'
//引入mock，让其生效
import "./api/mock.js"
import store from "./store/index.js"
  
let app= createApp(App)
app.config.globalProperties.$api=api
//for循环，注册ElementPlusIconsVue 的组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  //使用一下路由
  app.use(router)
 //挂载节点
  app.mount('#app')
  
  app.use(store)
