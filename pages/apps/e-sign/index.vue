<template>
  <div>
    <iframe
      id="signature-app"
      src="https://signature.zapto.org"
      width="100%"
      height="600px"
      @load="sendData"
    />
  </div>
</template>
<script>
export default {
  layout: 'eSign',
  beforeMount() {
    window.addEventListener('message', this.handleSubmitDocument)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleSubmitDocument)
  },
  methods: {
    async handleSubmitDocument(event) {
      if (event.data && event.data.type === 'signInfo') {
        const data = event.data
        console.log(data)
        const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNRECEPIENTS/updateESignRecepientStatus`
        const patchData = {
          recepientID: data.recepient.id,
          ESignStoreID: data.recepient.ESignStoreID,
          recepientList: data.allRecepients.map((item) => item.id),
          recepientSignature: data.defaultSign,
          handlebarsData: data.handlebarsData,
          requestID: data.request.id,
        }
        try {
          console.log({ patchData }, bitpodURL)
          const signRecepientResponse = await this.$axios.$patch(
            bitpodURL,
            patchData
          )
          if (signRecepientResponse) {
            console.log(signRecepientResponse)
          }
        } catch (err) {
          console.error(err)
        }
      }
    },
    async sendData() {
      console.log('Loaded')
      const queryParams = this.$route.query
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNRECEPIENTS/eSignDocumentForRecipient?requestID=${
        queryParams.requestID
      }&recepientID=${queryParams.recepientID}`
      try {
        const response = await this.$axios.$get(bitpodURL)
        if (response) {
          console.log(response)
          response.type = 'signInfo'
          const signatureApp = document.querySelector('#signature-app')
          signatureApp.contentWindow.postMessage(response, '*')
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
