<template>
  <v-app light class = 'app'>
    <div>
    <my-header v-if = '$route.fullPath !== "/" && $route.fullPath !== "/error"'></my-header>
      <main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </main>
    </div>
    <my-footer v-if = '$route.fullPath !== "/" && $route.fullPath !== "/error"'></my-footer>
  </v-app>
</template>

<script>
import myFooter from '~components/footer'
import myHeader from '~components/header'
export default {
  name: 'app',
  components: {
    myFooter, myHeader
  }
}
</script>
<style lang="stylus">
  @import './stylus/main';
  .app{
    min-height: 100vh;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
</style>
