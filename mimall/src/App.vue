<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import storage from './storage'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
    // 本地加载请求静态JSON文件的形式
    // this.axios.get('/mock/user/login.json').then((res) => {
    //   this.res = res
    // })
    // 通过easy-mock平台
    // 本地集成mockjs
    // this.axios.get('user/login.json').then((res) => {
    //   this.res = res
    // })
    this.getUser()
    this.getCartCount()
  },
  methods: {
    getUser () {
      this.axios.get('/user').then((res) => {
        // to-do 保存到Vuex里
        this.$store.dispatch('saveUserName', res.username);
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res) => {
        this.$store.dispatch('saveCartCount', res);
      })
    }
  },
}
</script>
<style lang="scss">
@import './assets/scss/total.scss';
</style>
