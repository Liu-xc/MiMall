<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <!-- <transition name="fade">
      <div class="fade-div" v-show="showPink"></div>
    </transition>-->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
export default {
  name: 'home',
  components: {
    NavHeader,
    NavFooter
  },
  data () {
    return {
      showPink: true
    }
  }
}
</script>

<style lang="scss">
// .fade-div {
//   background: pink;
//   transition: all 2s;
// }
// .fade-enter,
// .fade-leave-to {
//   height: 0;
// }
// .fade-enter-avtive,
// .fade-leave-active {
//   height: 200px;
// }
</style>