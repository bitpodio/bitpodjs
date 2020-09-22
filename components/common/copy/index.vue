<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" top="true" width="10">
      <div class="toast py-2 pr-1 pl-5 text-h2 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <input v-show="false" type="text" :class="uniqueId" :value="textToCopy" />
    <v-icon size="18" :class="`${uniqueId}btn`" @click="onCopy"
      >mdi-content-copy</v-icon
    >
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
  methods: {
    onCopy() {
      const writeBtn = document.querySelector(`.${this.uniqueId}btn`)
      const inputEl = document.querySelector(`.${this.uniqueId}`)

      writeBtn.addEventListener('click', () => {
        const inputValue = inputEl.value.trim()
        if (inputValue) {
          navigator.clipboard
            .writeText(inputValue)
            .then(() => {
              inputEl.value = ''
              if (writeBtn.textContent !== 'Copied!') {
                const originalText = writeBtn.textContent
                this.snackbar = true
                setTimeout(() => {
                  writeBtn.textContent = originalText
                }, 1500)
              }
            })
            .catch((err) => {
              console.log('Something went wrong', err)
            })
        }
      })
    },
  },
}
</script>
