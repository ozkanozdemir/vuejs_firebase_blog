<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/partials/Header.vue'
  import Footer from './components/partials/Footer.vue'

  export default {
    name: 'app',
    components: {
      appHeader: Header,
      appFooter: Footer
    }
  }
</script>

<style scoped>
  @import "assets/css/clean-blog.min.css";

  #app {

  }
</style>
