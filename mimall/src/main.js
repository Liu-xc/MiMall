import Vue from 'vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import env from './env'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store/index'
import './assets/scss/base.scss'


// mock开关
const mock = false
if (mock) {
  require('../public/mock/api.js')
}
// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL

// 接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data
  let path = location.hash
  if(res.status == 0) {
    return res.data
  } else if (res.status == 10) {
    if(path !== '#/index') {
      window.location.href = '/#/login'
    }
  } else {
    alert(res.msg)
    return Promise.reject(res)
  }
})

Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: require('../static/imgs/loading-svg/loading-bars.svg')
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
