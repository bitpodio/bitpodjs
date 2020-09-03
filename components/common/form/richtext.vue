<template>
  <div id="app">
    <jodit-editor v-model="content" :config="config" />
  </div>
</template>

<script>
import 'jodit/build/jodit.min.css'
import { JoditEditor } from 'jodit-vue'

export default {
  components: {
    JoditEditor,
  },
  props: ['value', 'field'],

  data() {
    return {
      content: this.value || '',
      config: {
        placeholder: '',
      },
    }
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
  },
}
</script>
