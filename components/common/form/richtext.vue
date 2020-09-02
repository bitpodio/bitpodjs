<template>
  <div id="app">
    <client-only>
      <JoditEditor v-model="content" />
    </client-only>
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
