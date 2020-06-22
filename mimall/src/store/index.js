import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '', // 登陆用户名
    cartCount: 0 //购物车商品数量
  },
  mutations,
  actions,
  modules: {
  }
})
