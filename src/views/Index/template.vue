<template>
  <div>
    {{params}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: ''
    }
  },
  watch: {
    $route(to, from) {
      this.params = to.params.catalog
    }
  },
  mounted() {
    this.params = this.$route.params.catalog
  }
}
</script>

<style lang="scss" scoped>

</style>
