<template>
  <div class="d-inline-block">
    <v-checkbox
      v-model="checkbox"
      color="green"
      dense
      @click.prevent="updateConnection"
    ></v-checkbox>

    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>

    <v-dialog v-model="dialog" top max-width="400">
      <v-card>
        <v-card-text class="pt-4 pb-0 body-1">
          {{ dialogText }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="dialog = false">
            <i18n path="Common.Ok" />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      checkbox: this.item.Status === 'Connected',
      status: this.item.Status || '',
      snackbar: false,
      snackbarText: '',
      timeout: 1000,
      dialog: false,
      dialogText: '',
    }
  },
  methods: {
    async updateConnection() {
      const id = this.item.id
      if (id && this.status) {
        const category = this.item.MetaData.Category
        const url = `${this.$bitpod.getApiUrl()}Connections/${id}`
        if (this.checkbox) {
          const data = { Status: 'Disconnected' }
          try {
            const res = await this.$axios.$put(url, data)
            if (res) {
              this.checkbox = res.Status === 'Connected'
            }
          } catch (e) {
            console.log(
              'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
              e
            )
          }
        } else {
          const filter = {
            where: {
              and: [
                { Status: 'Connected' },
                { 'MetaData.Category': 'Payment' },
              ],
            },
          }
          const filterurl = `${this.$bitpod.getApiUrl()}Connections?filter=${JSON.stringify(
            filter
          )}`
          const data = { Status: 'Connected' }
          if (category === 'Payment') {
            try {
              const res = await this.$axios.$get(filterurl, data)
              if (res) {
                if (res.length) {
                  this.dialogText =
                    'Only one Payment connection can be connected.'
                  this.dialog = true
                } else {
                  try {
                    const res = await this.$axios.$put(url, data)
                    if (res) {
                      this.checkbox = res.Status === 'Connected'
                    }
                  } catch (e) {
                    console.log(
                      'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
                      e
                    )
                  }
                }
              }
            } catch (e) {
              console.log(
                'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
                e
              )
            }
          } else {
            try {
              const res = await this.$axios.$put(url, data)
              if (res) {
                this.checkbox = res.Status === 'Connected'
                this.snackbarText = this.$t(
                  'Messages.Success.ConnectionSuccessfully'
                )
                this.snackbar = true
              }
            } catch (e) {
              console.log(
                'Errors in config/templates/grid/eventIntegration-grid/column-status.vue while making a axios call to Connection model from method updateConnection',
                e
              )
            }
          }
        }
      } else {
        this.dialogText = 'Please setup the connection to make it active.'
        this.dialog = true
      }
    },
  },
}
</script>
