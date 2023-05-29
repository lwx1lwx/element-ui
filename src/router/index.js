import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Right from '../components/power/Right.vue'
import Role from '../components/power/Role.vue'
import Test from '../views/test.vue'
import Tests from '../views/test2.vue'
import homePage from '../views/show/home/homePage.vue'
import canvasDemo from '../views/canvas-demo/canvas-demo.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeHall',
    redirect: '/homeHall'
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/test',
    name: 'Tests',
    component: Tests
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome',component:Welcome},
      {path: '/users',component:Users},
      {path: '/rights',component:Right},
      {path: '/roles',component:Role},
    ]
  },{
    path: '/homeHall',
    name: 'homeHall',
    component: homePage
  },{
    path: '/canvasDemo',
    name: 'canvasDemo',
    component: canvasDemo
  }
]

const router = new VueRouter({
  routes
})
// //挂载路由导航守卫
// router.beforeEach((to,from,next) => {
//   //to将要访问的路径
//   //from从哪个路径来
//   //next是一个函数，表示放行；next(),next('/login')
//   const apiToken = window.sessionStorage.getItem('token')
//   if (to.path === '/login') return next()
//   if (!apiToken) return next('/login')
//   next()
    
// }) 
export default router
