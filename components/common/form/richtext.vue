<template>
  <div id="app">
    <jodit-editor v-model="content" />
  </div>
</template>

<script>
import 'jodit/build/jodit.min.css'
import { JoditEditor } from 'jodit-vue'

export default {
  components: { JoditEditor },
  props: ['value', 'field'],

  data() {
    return {
      content: this.value || '',
    }
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
  },
}
</script>
