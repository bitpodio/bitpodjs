<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12>
      <Lookup v-model="value" :field="field" :field-name="fieldName" />
      value = {{ value }}
    </v-flex>
  </v-layout>
</template>

<script>
import Lookup from '~/components/common/lookup'
import content from '~/config/apps/event/content'
export default {
  components: {
    Lookup,
  },
  data() {
    return {
      field: content.Registrations.views.Registrations.fields.Status,
      fieldName: 'Status',
      value: '',
    }
  },
  created() {},
}
</script>
