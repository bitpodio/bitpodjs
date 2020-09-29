<template>
<div>
<v-checkbox v-model="checkbox" @click.prevent="updateConnection"></v-checkbox>

<v-snackbar v-model="snackbar" :timeout="timeout" top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>

    <v-dialog
      v-model="dialog"
      top
      max-width="290"
    >
    <v-card>
        <v-card-text class="mt-1">
          Please setup the connection to make it active.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
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
    }
  },
  methods: {
    async updateConnection() {
      debugger
      const id = this.item.id
      console.log('---id', id)
      if (id && this.status) {
        debugger
        const updateStatus = this.checkbox === true ?  'Disconnected':'Connected'
        try {
          const res = await this.$axios.$put(
            `https://${nuxtconfig.axios.eventUrl}/svc/api/Connections/${id}`,
            {
              Status: updateStatus,
            }
          )
          if (res) {
            console.log('res', res)
            this.checkbox = res.Status === 'Connected' ? true : false
            this.snackbarText = 'Connection Updated Successfully'
            this.snackbar = true
          }
        } catch (e) {
          console.log('Error in eventIntegration-grid/column-status in updateConnection updateStatus '+ updateStatus +' Error '+ e )
          this.snackbarText = 'Error has occured'+e
          this.snackbar = true
        }
      }
      else{
        this.dialog = true
      }
    },
  },
}
</script>
