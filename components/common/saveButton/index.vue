<template>
  <div>
    <v-btn
      :disabled="disabled || keyPressed"
      :outlined="outlined"
      :small="small"
      :dense="dense"
      :color="color"
      depressed
      :type="hasSubmitAction ? 'submit' : 'button'"
      @click="hasSubmitAction ? () => {} : buttonClicked()"
    >
      {{ label }}
      <v-icon v-show="keyPressed" right dark>
        mdi-spin mdi-loading mdi-24px
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      default: 'Save',
      type: String,
      required: false,
    },
    disabled: {
      default: false,
      type: Boolean,
      required: false,
    },
    outlined: {
      default: false,
      type: Boolean,
      required: false,
    },
    small: {
      default: false,
      type: Boolean,
      required: false,
    },
    dense: {
      default: false,
      type: Boolean,
      required: false,
    },
    color: {
      default: 'Primary',
      type: String,
      required: false,
    },
    action: {
      default: () => {},
      type: Function,
      required: false,
    },
    reset: {
      default: false,
      type: Boolean,
      required: false,
    },
    hasSubmitAction: {
      default: false,
      type: Boolean,
    },
    formName: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      keyPressed: false,
    }
  },
  watch: {
    reset() {
      this.keyPressed = false
    },
  },
  mounted() {
    this.$eventBus.$on('form-submitted', this.submitAction)
  },
  beforeDestroy() {
    this.$eventBus.$off('form-submitted')
  },
  methods: {
    buttonClicked() {
      this.action()
      this.keyPressed = true
    },
    submitAction(triggerForm) {
      if (this.hasSubmitAction && triggerForm === this.formName) {
        this.buttonClicked()
      }
    },
  },
}
</script>
