<template>
  <div>
    <confirm ref="confirm"></confirm>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click.stop="onDelete">
        <v-icon left class="fs-16">fa-trash</v-icon
        ><i18n path="Drawer.Delete" />
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" timeout="3000" top="true">
      <i18n path="Common.QuestionDeletedSuccessfully" />
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    viewName: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    refresh: {
      type: Function,
      required: false,
      default: () => false,
    },
  },

  data() {
    return {
      dialog: false,
      updateCount: 0,
      snackbar: false,
    }
  },
  watch: {
    snackbar(newVal) {
      if (!newVal) {
        this.refresh()
      }
    },
  },
  methods: {
    async onDelete() {
      this.dialog = false
      const check = await this.$refs.confirm.open(
        this.$t('Drawer.DeleteEventQuestion'),
        this.$tc('Messages.Warn.DeleteWarning', this.items.length, {
          subTitle: 'question',
        }),
        { color: 'error lighten-1' }
      )
      if (check === true) {
        this.items
          .reduce((acc, e) => {
            return acc
              .then(() => {
                return this.$axios.$delete(
                  `${this.$bitpod.getApiUrl()}Events/${
                    this.$route.params.id
                  }/Survey/${e.id}`
                )
              })
              .then((res) => {
                this.snackbar = true
                return res
              })
          }, Promise.resolve())
          .then(() => {
            this.snackbar = true
            return true
          })
          .catch((e) => console.log('error', e))
      }
    },
  },
}
</script>
