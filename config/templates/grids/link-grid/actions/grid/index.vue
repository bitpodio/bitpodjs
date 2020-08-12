<template>
  <div>
    <customItem1 :onNewItemSave="onNewItemSave" :refresh="refresh" />
  </div>
</template>

<script>
import customItem1 from './custom-item1'
export default {
  components: {
    customItem1,
  },
  props: ['onNewItemSave', 'refresh'],
}
</script>
