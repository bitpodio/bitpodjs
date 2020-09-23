<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true" width="10">
      <div
        class="toast py-2 pr-1 pl-5 text-h6 light font-weight-regular text-center"
      >
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <input v-show="false" type="text" :class="uniqueId" :value="textToCopy" />
    <v-icon size="18" :class="`${uniqueId}btn`">mdi-content-copy</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    textToCopy: {
      default: 'text123',
      type: String,
      required: false,
    },
    uniqueId: {
      default: '',
      type: String,
      required: false,
    },
  },
  data() {
    return {
      snackbar: false,
      snackbarText: 'Copied to clipboard',
      timeout: 1000,
    }
  },
  mounted() {
    const writeBtn = document.querySelector(`.${this.uniqueId}btn`)
    writeBtn.addEventListener('click', this.clickListener)
  },
  beforeDestroy() {
    const writeBtn = document.querySelector(`.${this.uniqueId}btn`)
    if (writeBtn) {
      writeBtn.removeEventListener('click', this.clickListener)
    }
  },
  methods: {
    async clickListener() {
      const inputEl = document.querySelector(`.${this.uniqueId}`)
      const inputValue = inputEl.value.trim()
      if (inputValue) {
        try {
          await navigator.clipboard.writeText(inputValue)
          inputEl.value = ''
          this.snackbar = true
        } catch (e) {
          console.log('Something went wrong', e)
        }
      }
    },
  },
}
</script>
