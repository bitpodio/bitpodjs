<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-dialog
        v-model="isCancelReg"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-4 text-h5">
              <i18n path="Common.Comment" />
            </h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="comment"
                  outlined
                  required
                  :rules="requiredRules"
                  dense
                  rows="4"
                  placeholder="Say something"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn :disabled="!valid" color="primary" depressed @click="onSave"
              ><i18n path="Common.Comment"
            /></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required } from '~/utility/rules.js'
import registration from '~/config/apps/event/gql/registration.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { getApiUrl } from '~/utility/index.js'

export default {
  props: {
    isCancelReg: {
      type: Boolean,
      default: false,
      allowSpaces: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      valid: false,
      requiredRules: [required],
    }
  },

  methods: {
    close() {
      this.$emit('update:isCancelReg', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    async onSave() {
      const baseUrl = getApiUrl()
      const regId = this.$route.params.id
      let commentRes = null
      let regRes = null
      try {
        commentRes = await this.$axios.$post(
          `${baseUrl}Registrations/${regId}/Comment`,
          {
            Notes: this.comment,
          }
        )
      } catch (e) {
        console.error('Error', e)
      }
      if (commentRes) {
        try {
          regRes = await this.$axios.$post(
            `${baseUrl}Registrations/update?where={"id":"${regId}"}`,
            {
              Status: 'Cancelled',
            }
          )
        } catch (e) {
          console.error('Error', e)
        }
      }
      if (regRes) {
        this.close()
        this.refresh()
        return regRes
      }
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${registration}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const registration = formatGQLResult(data, 'Registration')
        this.regData = registration.length > 0 ? { ...registration[0] } : {}

        return {
          event: {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
