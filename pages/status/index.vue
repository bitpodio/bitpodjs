<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12>
      <Lookup v-model="value" :field="field" :field-name="fieldName" />
      value = {{ value }}

      <Grid
        :content="content.Registrations"
        view-name="Registrations"
        search=""
        :filter="filter"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Lookup from '~/components/common/form/lookup.vue'
import content from '~/config/apps/event/content'
import Grid from '~/components/common/grid'
export default {
  components: {
    Lookup,
    Grid,
  },
  data() {
    return {
      field: content.Registrations.views.Registrations.fields.Status,
      fieldName: 'Status',
      value: '',
      content,
      filter: {
        where: {
          Status: this.value,
        },
      },
    }
  },
  created() {},
}
</script>
