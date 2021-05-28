<template>
  <div v-if="value" class="reg-status">
    <v-chip
      :class="[
        'my-2',
        {
          warning: value === 'Opened',
          error: value === 'Declined',
          info: value === 'Sent',
          success: value === 'Signed',
        },
      ]"
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
  },
  data() {
    return {
      Status: 'value',
    }
  },
}
</script>
