import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import store from './store';
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存在不存在
  const token = Cookie.get('token')
  //如果token不存在，说明当前用户未登录,应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {//如果token存在，说明用户登陆，此时跳转至首页
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  },
}).$mount('#app')