<template>
  <v-container class="esignature-container my-12">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-row justify="center" align="center">
          <v-img
            max-width="35"
            max-height="35"
            class="mb-n4"
            :src="$config.cdnUri + 'otter-solid'"
          ></v-img>
          <span class="text-h2 px-2 black--text text--darken-2 esignature-logo">
            docxy
          </span>
        </v-row>
        <v-row justify="center">
          <span class="text-body-2 px-2 grey--text text--darken-2">
            eSignature for google docs
          </span>
        </v-row>
        <v-row justify="center" class="py-4">
          <v-col cols="12">
            <v-row justify="center">
              <v-icon :size="144" color="green" class="mb-6"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row justify="center">
              <span class="text-h4 px-2 grey--text text--darken-2 text-center"
                >Your request has been created successfully
              </span>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'eSignature',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Risque&display=swap');

.esignature-logo.text-h2 {
  font-family: 'Risque', cursive !important;
}
</style>
