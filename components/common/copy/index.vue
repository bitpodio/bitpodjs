<template>
  <div>
    <v-snackbar
      v-if="!hideToast"
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      width="2px"
    >
      <div
        class="toast py-2 pr-1 pl-5 text-h6 light font-weight-regular text-center"
      >
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <input
      v-show="false"
      type="text"
      :class="uniqueId ? uniqueId : 'to-copy'"
      :value="textToCopy"
    />

    <div :class="uniqueId ? `${uniqueId}btn` : 'write-btn'">
      <v-icon :size="iconSize">mdi-content-copy</v-icon>
      {{ label ? label : '' }}
    </div>
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
    label: {
      default: '',
      type: String,
      required: false,
    },
    hideToast: {
      default: false,
      type: Boolean,
    },
    iconSize: {
      default: '30',
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
    const writeBtn = this.uniqueId
      ? document.querySelector(`.${this.uniqueId}btn`)
      : document.querySelector('.write-btn')
    writeBtn.addEventListener('click', this.clickListener)
  },
  beforeDestroy() {
    const writeBtn = this.uniqueId
      ? document.querySelector(`.${this.uniqueId}btn`)
      : document.querySelector('.write-btn')
    if (writeBtn) {
      writeBtn.removeEventListener('click', this.clickListener)
    }
  },
  methods: {
    async clickListener() {
      const inputEl = this.uniqueId
        ? document.querySelector(`.${this.uniqueId}`)
        : document.querySelector('.to-copy')
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
