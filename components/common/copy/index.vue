<template>
  <div>
    <v-snackbar
      v-if="!hideToast"
      v-model="snackbar"
      :timeout="timeout"
      :top="true"
      width="2px"
    >
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <input
      v-show="false"
      type="text"
      :class="uniqueId ? uniqueId : 'to-copy'"
      :value="textToCopy"
    />
    <v-tooltip v-if="tooltip" bottom>
      <template v-slot:activator="{ on, attrs }">
        <div
          :class="uniqueId ? `${uniqueId}btn` : 'write-btn'"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon :size="iconSize" class="cursorPointer"
            >mdi-content-copy</v-icon
          >
          {{ label ? label : '' }}
        </div>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
    <div v-else :class="uniqueId ? `${uniqueId}btn` : 'write-btn'">
      <v-icon :size="iconSize" class="cursorPointer">mdi-content-copy</v-icon>
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
      default: '20',
      type: String,
      required: false,
    },
    tooltip: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      snackbar: false,
      snackbarText: this.$t('Messages.Success.CopiedClipboard'),
      timeout: 3000,
    }
  },
  mounted() {
    const writeBtn = this.uniqueId
      ? document.querySelector(`.${this.uniqueId}btn`)
      : document.querySelector('.write-btn')
    writeBtn.addEventListener('click', this.clickListener)
    const textField = document.getElementById('textField')
    const copy = document.getElementById('copy')
    copy.addEventListener('click', () => {
      console.log('clicked')
      textField.select()
      textField.target.focus()
      document.execCommand('copy')
    })
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
        if (navigator.clipboard) {
          console.log('inside the if block')
          try {
            await navigator.clipboard.writeText(inputValue)
            inputEl.value = ''
            this.snackbar = true
            this.snackbarText = this.$t('Messages.Success.CopiedClipboard')
          } catch (e) {
            console.log('Something went wrong', e)
            this.snackbar = true
            this.snackbarText = this.$t('Common.SomeErrorOccured')
          }
        } else {
          console.log('inside the else block')
          console.log('inputValue', inputValue)
          // let textArea = document.createElement('textarea')
          // textArea.value = inputValue
          // textArea.style.display = 'none'
          // document.body.appendChild(textArea)
          inputValue.focus()
          inputValue.select()
          try {
            const isSuccess = document.execCommand('copy')
            console.log('isSuccess', isSuccess)
            inputEl.value = ''
            if (isSuccess) {
              this.snackbar = true
              this.snackbarText = this.$t('Messages.Success.CopiedClipboard')
            }
          } catch (e) {
            console.log('Something went wrong', e)
            this.snackbar = true
            this.snackbarText = this.$t('Common.SomeErrorOccured')
          }
        }
      }
    },
  },
}
</script>
