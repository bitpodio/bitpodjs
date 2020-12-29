<template>
  <div class="positionRelative ps-top6">
    <div v-if="item.isDefault === true">
      <v-checkbox
        v-model="checkbox"
        success
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateRegistrationType"
      ></v-checkbox>
    </div>
    <div v-else>
      <v-checkbox
        v-model="checkbox"
        error
        dense
        height="20"
        class="ma-0 pa-0"
        @change="updateRegistrationType"
      ></v-checkbox>
    </div>
    <confirm ref="confirm"></confirm>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      checkbox: this.item.isDefault,
    }
  },
  methods: {
    async updateRegistrationType() {
      try {
        const filter = { where: { EventId: this.$route.query.event } }
        const res = await this.$axios.$get(
          `${this.$bitpod.getApiUrl()}RegistrationTypes?filter=${JSON.stringify(
            filter
          )}`
        )
        if (res) {
          const count = res.filter((e) => e.isDefault === true).length
          if (count >= 1 && this.checkbox) {
            const confirmRes = await this.$refs.confirm.open(
              this.$t('Messages.Warn.RegistrationTypeWarning'),
              this.$t('Messages.Warn.RegistrationTypeDefault'),
              { color: 'warning', buttonTrueText: 'Okay' }
            )
            if (confirmRes) {
              this.checkbox = false
              this.refresh()
            }
          } else {
            try {
              const res = await this.$axios.$put(
                `${this.$bitpod.getApiUrl()}RegistrationTypes/${this.item.id}`,
                {
                  isDefault: this.checkbox,
                }
              )
              if (res) {
                this.refresh()
              }
            } catch (e) {
              console.error(
                `Error in config/templates/grids/eventRegistrationType-grid/common-isdefault.vue while PUT request to RegistrationType from updateRegistrationType method  context: Id:- ${this.item.id}`,
                e
              )
            }
          }
        }
      } catch (e) {
        console.error(
          `Error in config/templates/grids/eventRegistrationType-grid/common-isdefault.vue while Get a RegistrationType from updateRegistrationType method  context: EventId:- ${this.$route.query.event}`,
          e
        )
      }
    },
  },
}
</script>
