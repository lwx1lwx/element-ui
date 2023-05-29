import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/css/common.css'
import './assets/fonts/iconfont.css'
import 'es6-promise/auto'
import headerPc from './components/hall/homePage/header-pc.vue'
import bannerPc from './components/hall/homePage/banner-pc.vue'
import axios from 'axios'
import shuffle from 'lodash/shuffle' // 局部引用
import _ from "lodash" // 全局引用，下方的throttle改成_.throttle即可 ( 也可再main.js中挂载在vue的prototype中，页面组件中通过this._.throttle进行调用)
//这样就可以通过this直接访问$http从而发起ajax请求
// 配置请求根路径

/** swiper插件 **/
import VueAwesomeSwiper from 'vue-awesome-swiper' //Swiper组件
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log(config)
  if (window.sessionStorage.getItem('token'))
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(shuffle)
Vue.use(_)
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
      var s = JSON.stringify
      el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
  })
Vue.component('headerPc',headerPc)
Vue.component('bannerPc',bannerPc)

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
console.log('Vue实例',vm)
