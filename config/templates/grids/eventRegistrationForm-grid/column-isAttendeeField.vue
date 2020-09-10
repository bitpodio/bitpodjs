<template>
  <v-checkbox v-model="checkbox" @change="updateRegForm"></v-checkbox>
</template>

<script>
export default {
  props: ['item', 'value', 'context', 'refresh'],
  data() {
    return {
      checkbox: this.item.isAttendeeField,
    }
  },
  methods: {
    updateRegForm() {
      this.$axios
        .$put(
          `https://event.test.bitpod.io/svc/api/Events/${this.$route.params.id}/RegistrationForm/${this.item.id}`,
          {
            isAttendeeField: this.checkbox,
          }
        )
        .then((res) => {
          this.refresh()
          return res
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
  },
}
</script>
