<template>
  <v-checkbox v-model="checkbox" @change="updateRegistrationType"></v-checkbox>
</template>

<script>
import gql from 'graphql-tag'
import nuxtconfig from '../../../../nuxt.config'
import registrationType from '~/config/apps/event/gql/registrationType.gql'
import { formatGQLResult } from '~/utility/gql.js'
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
      const where = { EventId: this.$route.query.event }
      const result = await this.$apollo.query({
        query: gql`
          ${registrationType}
        `,
        variables: {
          filters: {
            where,
          },
        },
      })
      const regType = formatGQLResult(result.data, 'RegistrationType')
      const count = regType.filter((e) => e.isDefault === true).length
      if (count >= 1 && this.checkbox) {
        alert('Only one registration type can be set to default')
        this.refresh()
      } else {
        try {
          const res = await this.$axios.$put(
            `https://${nuxtconfig.axios.eventUrl}/svc/api/RegistrationTypes/${this.item.id}`,
            {
              isDefault: this.checkbox,
            }
          )
          if (res) {
            this.refresh()
          }
        } catch (e) {
          console.log('Error', e)
        }
      }
    },
  },
}
</script>
