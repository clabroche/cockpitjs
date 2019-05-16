<template>
  <div>
    Status: {{status}}
    <input type="text" v-if="!openDir" placeholder="dir..."  @change="importDir($event.target.value)">
    <div>
      OpenDir: {{openDir}}
    </div>
    <div v-if="loading">Search for npm directories...</div>
    <ul>
      <li v-for="npm of npms" :key="npm">{{npm}}</li>
    </ul>
  </div>
</template>

<script>
import Status from '../models/status'
import fs from '../models/fs'
export default {
  name: 'Home',
  props: {
  },
  data() {
    return {
      status: null,
      openDir: null,
      npms: [],
      loading: false
    }
  },
  async mounted() {
    this.status = await Status.get()
    this.openDir = await fs.openDir()
  },
  methods: {
    async importDir(path) {
      this.npms = []
      console.log(path)
      this.loading = true
      this.npms = await fs.import(path)
        .catch(err => {
          this.loading = false
          Promise.reject(err)
        })
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
</style>
