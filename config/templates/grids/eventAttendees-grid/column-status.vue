<template>
  <div>
    <v-chip
      small
      :class="{
        orange: value === 'Cancelled',
        red: value === 'Failed',
        orange: value === 'Pending',
        success: value === 'Success',
        'orange--text': value === 'Cancelled' && outlined,
        'red--text': value === 'Failed' && outlined,
        'orange--text': value === 'Pending' && outlined,
        'green--text': value === 'Success' && outlined,
      }"
      :label="label"
      :outlined="outlined"
      :text-color="outlined ? '' : 'white'"
    >
      {{ value }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    label: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      Status: 'value',
    }
  },
}
</script>
