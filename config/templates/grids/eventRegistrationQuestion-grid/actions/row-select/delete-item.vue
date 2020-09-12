<template>
  <div>
    <v-col class="px-0">
      <v-btn text small v-bind="attrs" v-on="on" @click="onDelete">
        <v-icon left>mdi-delete</v-icon>Delete
      </v-btn>
    </v-col>
    <v-snackbar v-model="snackbar" timeout="2000" top="true">
      Item deleted successfully.

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import nuxtconfig from '~/nuxt.config'
export default {
  props: ['content', 'viewName', 'items', 'refresh'],
  data() {
    return {
      dialog: false,
      updateCount: 0,
      snackbar: false,
    }
  },
  methods: {
    onDelete() {
      this.dialog = false
      this.items
        .reduce((acc, e) => {
          return acc
            .then(() => {
              return this.$axios.$delete(
                `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Events/${this.$route.params.id}/Survey/${e.id}`
              )
            })
            .then((res) => {
              console.log('Item deleted successfully', res)
              this.refresh()
              return res
            })
        }, Promise.resolve())
        .then(() => {
          this.snackbar = true
          return true
        })
        .catch((e) => console.log('error', e))
    },
  },
}
</script>
