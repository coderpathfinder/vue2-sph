<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="!$route.meta.footerDisplay"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //因为三级菜单一般只需请求一次服务器即可，所以可以从TypeNav组件中移到App根组件中，
    // 让其只执行一次请求
    this.$store.dispatch('categoryList');
  }
}
</script>

<style scoped>

</style>
