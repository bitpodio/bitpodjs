<template>
  <v-container class="esignature-container">
    <v-form v-model="eSignatureRequestForm">
      <v-row>
        <v-col cols="12">
          <div class="text-h4">Hello</div>
        </v-col>
        <!--
        @todo: Update label to use localization
        -->
        <v-col cols="10">
          <v-text-field
            v-model="templateUrl"
            label="Published Doucment Url"
            outlined
            :loading="templateUrlLoading"
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn icon @click="verifyTemplateUrl"
            ><v-icon>mdi-check</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  layout: 'public',
  data() {
    return {
      eSignatureRequestForm: false,
      templateUrl: '',
      templateUrlLoading: false,
      recipients: [],
    }
  },
  methods: {
    verifyTemplateUrl() {
      this.getHTMLTemplate(this.templateUrl)
    },
    async getHTMLTemplate(documentUrl) {
      const regExp = /{{{ESign\.(\w+)[.[\w]+]?}}}/g
      this.templateUrlLoading = true
      try {
        const res = await this.$axios.get(documentUrl)
        const matches = []
        const documentText = res.data
        let regexMatch
        while ((regexMatch = regExp.exec(documentText)) !== null) {
          matches.push(regexMatch[1])
        }
        const parties = [...new Set(matches)]
        for (const value of parties) {
          this.recipients.push({
            type: value,
            email: '',
          })
        }
      } catch (err) {
        console.error(
          `Error in eSign-grid/ESignForm.vue in getHTMLTemplate while making a GET call to get the HTML code of the URL, context: ${documentUrl}`,
          err
        )
      } finally {
        this.templateUrlLoading = false
      }
    },
  },
}
</script>
<style>
.esignature-container {
  max-width: 70%;
}
</style>
