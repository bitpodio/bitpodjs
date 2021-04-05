import Vue from 'vue'
import { VDialog } from 'vuetify/lib'
import _ from 'lodash'
import { postGaData } from '~/utility/index.js'

export const customVDialog = {
  extends: VDialog,
  data() {
    return {
      obj: {},
      formLabel: '',
      buttonText: '',
    }
  },
  methods: {
    closeConditional(e) {
      const isTargetButtonAction = e.target._prevClass === 'v-btn__content'
      const isTargetClose =
        e.target &&
        e.target._prevClass &&
        e.target._prevClass.includes('v-icon' && 'mdi-close')
      if (isTargetButtonAction) {
        this.formLabel = this.getFormLabel()
        this.buttonText = e.target && e.target.textContent.trim()
        if (this.formLabel !== undefined && this.buttonText !== undefined) {
          this.obj = {
            hitType: 'event',
            eventCategory: 'Form',
            eventAction: 'Button-Click',
            eventLabel: this.formLabel + ' > ' + this.buttonText,
          }
          this.postData()
        }
      } else if (isTargetClose) {
        this.formLabel = this.getFormLabel()
        if (this.formLabel !== undefined) {
          this.obj = {
            hitType: 'event',
            eventCategory: 'Form',
            eventAction: 'Close',
            eventLabel: this.formLabel,
          }
          this.postData()
        }
      }

      const target = e.target
      // Ignore the click if the dialog is closed or destroyed,
      // if it was on an element inside the content,
      // if it was dragged onto the overlay (#6969),
      // or if this isn't the topmost dialog (#9907)
      return (
        !(
          this._isDestroyed ||
          !this.isActive ||
          this.$refs.content.contains(target) ||
          (this.overlay && target && !this.overlay.$el.contains(target))
        ) && this.activeZIndex >= this.getMaxZIndex()
      )
    },
    bind() {
      this.formLabel = this.getFormLabel()
      if (this.formLabel) {
        this.obj = {
          hitType: 'event',
          eventCategory: 'Form',
          eventAction: 'Show',
          eventLabel: this.formLabel,
        }
        this.postData()
      }
      window.addEventListener('focusin', this.onFocusin)
    },
    unbind() {
      window.removeEventListener('focusin', this.onFocusin)
    },
    postData: _.debounce(function () {
      postGaData(this.obj)
    }, 100),
    getFormLabel() {
      const isTab =
        this.$refs.content.getElementsByClassName('v-card__title')[0] &&
        this.$refs.content
          .getElementsByClassName('v-card__title')[0]
          .getElementsByClassName('v-tabs').length
      if (isTab) {
        this.$refs.content
          .getElementsByClassName('v-card__title')[0]
          .getElementsByClassName('v-tabs')[0]
          .replaceWith('')
        return (
          this.$refs.content.getElementsByClassName('v-card__title')[0] &&
          this.$refs.content
            .getElementsByClassName('v-card__title')[0]
            .textContent.trim()
        )
      } else {
        return (
          this.$refs.content.getElementsByClassName('v-card__title')[0] &&
          this.$refs.content
            .getElementsByClassName('v-card__title')[0]
            .textContent.trim()
        )
      }
    },
  },
}
Vue.use(customVDialog)
Vue.component('v-dialog', customVDialog)
