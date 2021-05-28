<template>
  <div>
    <iframe
      id="signature-app"
      src="https://signature.zapto.org"
      width="100%"
      @load="sendData"
    />
    <!-- <iframe
      id="signature-app"
      src="http://localhost:8080"
      width="100%"
      @load="sendData"
    /> -->
  </div>
</template>
<script>
export default {
  layout: 'public',
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
        const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNRECIPIENTS/updateESignRecipientStatus`
        const patchData = {
          recipientID: data.recipient.id,
          ESignStoreId: data.recipient.ESignStoreId,
          recipientSignature: data.defaultSign,
          recipientInitials: data.defaultInitials,
          handlebarsData: data.handlebarsData,
          declineSign: data.declineSign,
          requestID: data.request.id,
          hostUrl: this.$bitpod.getApiUrl(),
        }
        try {
          const signRecipientResponse = await this.$axios.$patch(
            bitpodURL,
            patchData
          )
          if (signRecipientResponse) {
            this.sendResponseData(signRecipientResponse)
          }
        } catch (err) {
          console.error(
            `Error in eSign/index.vue in handleSubmitDocument method while making a POST call to a custom API to update the user's signature, context: ${bitpodURL}`,
            err
          )
        }
      }
    },
    sendResponseData(data) {
      data.type = 'responseInfo'
      const signatureApp = document.querySelector('#signature-app')
      signatureApp.contentWindow.postMessage(data, '*')
    },
    async sendData() {
      const queryParams = this.$route.query
      const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNRECIPIENTS/eSignDocumentForRecipient?requestId=${
        queryParams.requestID
      }&recipientId=${queryParams.recipientID}`
      try {
        const response = await this.$axios.$get(bitpodURL)
        if (response) {
          response.type = 'signInfo'
          const signatureApp = document.querySelector('#signature-app')
          signatureApp.contentWindow.postMessage(response, '*')
        }
      } catch (err) {
        console.error(
          `Error in eSign/index.vue in sendData method while making a GET call to a custom API to retrieve data regarding the request, context: ${bitpodURL}`,
          err
        )
      }
    },
  },
}
</script>

<style>
#signature-app {
  height: 90vh;
}
</style>
