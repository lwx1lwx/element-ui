import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/Login'
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from从哪个路径来
  //next是一个函数，表示放行；next(),next('/login')
  const apiToken = window.sessionStorage.getItem('token')
  if (to.path === '/login') return next()
  if (!apiToken) return next('/login')
  next()
    
}) 
export default router
