<template>
  <div>
    <esign v-model="signatureData" />
  </div>
</template>
<script>
export default {
  layout: 'eSign',
  data() {
    return {
      signatureData: null,
    }
  },
  async beforeCreate() {
    const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNRECEPIENTS/eSignDocumentForRecipient?requestID=605331b0f49e05000a31f274&recepientID=605331abf49e05000a31f271`
    try {
      const response = await this.$axios.$get(bitpodURL)
      if (response) {
        console.log(response)
        this.signatureData = response
      }
    } catch (err) {
      console.error(err)
    }
  },
}
</script>
