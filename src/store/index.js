import Vue from 'vue'
import Vuex from 'vuex'	// 引入Vuex
 
Vue.use(Vuex)	// 应用Vuex插件
 
// 准备actions——用于响应组件中的动作
const actions = {
 
}
 
// 准备mutations——用于操作数据（state）		
const mutations = {
 
}
	
// 准备state——用于存储数据
const state = {
}			
 
// 创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})