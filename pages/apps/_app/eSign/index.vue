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
        console.log(data)
        const bitpodURL = `${this.$bitpod.getApiUrl()}ESIGNRECIPIENTS/updateESignRecipientStatus`
        const patchData = {
          recipientID: data.recipient.id,
          ESignStoreId: data.recipient.ESignStoreId,
          recipientList: data.request.Recipient.map((item) => item.id),
          recipientSignature: data.defaultSign,
          recipientInitials: data.defaultInitials,
          handlebarsData: data.handlebarsData,
          declineSign: data.declineSign,
          requestID: data.request.id,
          emailSubject: data.request.Subject,
          senderEmail: data.request.SenderEmail,
          hostUrl: this.$bitpod.getApiUrl(),
        }
        try {
          console.log(bitpodURL)
          console.log({ patchData }, bitpodURL)
          const signRecipientResponse = await this.$axios.$patch(
            bitpodURL,
            patchData
          )
          if (signRecipientResponse) {
            console.log(signRecipientResponse)
          }
        } catch (err) {
          console.error(err)
        }
      }
    },
    async sendData() {
      console.log('Loaded')
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
        console.error(err)
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
