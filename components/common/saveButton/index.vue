<template>
  <div>
    <v-btn
      :disabled="disabled || keyPressed"
      :color="color"
      @click="buttonClicked"
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
  },
  data() {
    return {
      keyPressed: false,
    }
  },
  methods: {
    buttonClicked() {
      this.action()
      this.keyPressed = true
    },
  },
}
</script>
