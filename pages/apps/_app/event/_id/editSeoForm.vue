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
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-5 pb-2 text-h5">Edit Seo Details</h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click.native="close">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0">
            <v-row>
              <v-col class="pt-2">
                <v-checkbox
                  v-model="seoData.AutoUpdateSEOElements"
                  label=" SEO elements are auto derived from event elements when event is created or edited. Check this if you want to Turn off auto update"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="seoData.SEOTitle"
                  :rules="nameRules"
                  label="Part which goes into URL"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="seoData.SEODesc"
                  label="Meta Description"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="seoData.SEOKeywords"
                  label="Meta Keywords"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
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
      type: Boolean,
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
      seoData: {
        SEOTitle: '',
        SEODesc: '',
        SEOKeywords: '',
        AutoUpdateSEOElements: '',
      },
    }
  },
  methods: {
    close() {
      this.$emit('update:seoForm', false)
    },
    refresh() {
      this.$apollo.queries.data.refresh()
    },
    async onSave() {
      delete this.formData._VenueAddress
      this.formData.SEOTitle = this.seoTitle
      try {
        const res = await this.$axios.$patch(
          `https://${nuxtConfig.axios.eventUrl}/svc/api/Events/${this.$route.params.id}`,
          {
            ...this.seoData,
          }
        )
        if (res) {
          this.close()
          this.refresh()
          this.data.event = res
        }
      } catch (e) {
        console.log('Error', e)
      }
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
        this.seoData.SEODesc = this.formData.SEODesc
        this.seoData.SEOKeywords = this.formData.SEOKeywords
        this.seoData.SEOTitle = this.formData.SEOTitle
        this.seoData.AutoUpdateSEOElements = this.formData.AutoUpdateSEOElements
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
