<template>
  <div>
    <imooc-panel></imooc-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  name: 'Home',
  components: {
    'imooc-panel': Panel
  }
}
</script>
