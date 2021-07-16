<template>
  <div>
    <v-menu
      right
      :offset-x="offset"
      transition="slide-y-transition"
      content-class="overflowHidden"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item @click="revokeAction">
          <v-list-item-icon class="mr-2">
            <i class="fa fa-trash fs-16 mt-1" aria-hidden="true"></i>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><i18n path="Common.RevokeAction" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="toast py-2 pr-1 pl-3">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <confirm ref="confirm"></confirm>
  </div>
</template>

<script>
import { getID4ServerUrl } from '~/utility'
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
      snackbar: false,
      snackbarText: '',
      timeout: 3000,
    }
  },
  methods: {
    async revokeAction() {
      const url = `${getID4ServerUrl(this)}${this.item.revokeAction}`
      const res1 = await this.$refs.confirm.open(
        this.$t('Common.RevokeAction'),
        this.$t('Messages.Warn.AppClientDeleteWarn'),
        { color: 'warning' }
      )
      try {
        if (res1) {
          const res = await this.$axios.$delete(`${url}`)
          if (res) {
            this.snackbarText = this.$t(
              'Messages.Success.ClientDeleteSuccessMsg'
            )
            this.snackbar = true
            this.refresh()
          }
        }
      } catch (err) {
        console.error(
          `Error in config/templates/grids/connectedapps-grid/column-action.vue in revokeAction method context:-\nURl:${url} \nerror:${err}`
        )
      }
    },
  },
}
</script>
