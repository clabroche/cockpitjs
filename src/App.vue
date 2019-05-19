<template>
  <div id="app">
    <navbar></navbar>
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue';
export default {
  components: {
    'navbar': NavbarVue
  }
}
</script>

<style lang="scss">
@import url('../node_modules/@fortawesome/fontawesome-free/css/all.min.css');
@font-face {
  font-family: rose;
  src: url(/Rose-Katrinah.ttf);
}
body {
  margin: 0;
  min-height: 100vh;
  background-color: #353b4f;
  color: white
}
.app-content {
  height: calc(100vh - 75px);
  overflow: auto;
}
ul {
  margin: 0;
  padding: 0;
  li {
    padding: 0;
    margin: 0;
  }
}
</style>
