<template>
  <div>
    <div class="checkbox">
      <v-checkbox v-model="checkbox" @change="updateRegForm"></v-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'value', 'context'],
  data() {
    return {
      checkbox: this.item.isShowField,
    }
  },
  methods: {
    updateRegForm() {
      this.$axios
        .$put(
          `https://event.test.bitpod.io/svc/api/Events/${this.$route.params.id}/RegistrationForm/${this.item.id}`,
          {
            isShowField: this.checkbox,
          }
        )
        .then((res) => {
          return res
        })
        .catch((e) => {
          console.log('error', e)
        })
    },
  },
}
</script>
