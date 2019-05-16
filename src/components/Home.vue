<template>
  <div>
    Status: {{status}}
  </div>
</template>

<script>
import Status from '../models/status'
export default {
  name: 'Home',
  props: {
  },
  data() {
    return {
      status: null
    }
  },
  async mounted() {
    this.status = await Status.get()
  }
}
</script>

<style scoped lang="scss">
</style>
