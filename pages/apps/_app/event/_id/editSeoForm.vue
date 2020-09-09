<template>
  <v-layout>
    <v-form ref="form" v-model="valid">
      <v-dialog
        v-model="seoForm"
        persistent
        scrollable
        content-class="slide-form-default"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dense flat dark fixed color="accent">
            <v-toolbar-title class="body-1">Edit Seo Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click.native="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="formData.AutoUpdateSEOElements"
                  label=" SEO elements are auto derived from event elements when event is created or edited. Check this if you want to Turn off auto update"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="seoTitle"
                  :rules="nameRules"
                  label="Part which goes into URL"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.SEODesc"
                  label="Meta Description"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.SEOKeywords"
                  label="Meta Keywords"
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pl-4">
            <v-btn
              color="primary"
              :disabled="!valid"
              depressed
              @click.native="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag'
import nuxtConfig from '../../../../../nuxt.config'
import { required } from '~/utility/rules.js'
import event from '~/config/apps/event/gql/event.gql'
import { formatGQLResult } from '~/utility/gql.js'

export default {
  props: {
    seoForm: {
      default: false,
    },
  },
  data() {
    return {
      data: {
        event: {},
      },
      nameRules: [required],
      seoTitle: '',
      formData: {},
      valid: true,
    }
  },
  methods: {
    close() {
      this.$emit('update:seoForm', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    onSave() {
      delete this.formData._VenueAddress
      this.formData.SEOTitle = this.seoTitle
      this.$axios
        .$patch(
          `https://${nuxtConfig.axios.eventUrl}/svc/api/Events/${this.$route.params.id}`,
          {
            ...this.formData,
          }
        )
        .then((res) => {
          this.close()
          this.refresh()
          return (this.data.event = res)
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${event}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
          eventId: this.$route.params.id,
        }
      },
      update(data) {
        const event = formatGQLResult(data, 'Event')
        this.formData = event.length > 0 ? { ...event[0] } : {}
        this.formData.id = this.$route.params.id
        this.seoTitle = this.formData.SEOTitle
        return {
          event: event.length > 0 ? event[0] : {},
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
