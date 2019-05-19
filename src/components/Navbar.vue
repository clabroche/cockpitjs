<template>
  <div class="navbar-root">
    <div class="logo" @click="$router.push({name: 'projects'})">
      <img src="/cockpit.svg"  alt="Logo" />
      Cockpit
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  components: {
  },
  props: {
  },
  data() {
    return {
    }
  },
  async mounted() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.navbar-root {
  background: #4D677E;
  width: 100vw;
  height: 75px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 2em;
    font-family: 'rose';
    cursor: pointer;
    transition: 300ms;
    &:hover {
      transform: scale(1.1)
    }
    img{
      height: 50%;
    }
  }
}
</style>
