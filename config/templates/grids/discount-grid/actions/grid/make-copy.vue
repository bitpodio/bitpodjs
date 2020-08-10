<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <v-icon left>mdi-content-copy</v-icon>Make Copy
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Registration</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="mt-2">
              <v-text-field
                v-model="formdata.codeTitle"
                label="Code Title*"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'

function buildMutationCreateQuery(modelName) {
  return `mutation($Inputs : ${modelName}CreateInput!){ ${modelName} { ${modelName}Create(input:$Inputs){ clientMutationId obj{ id } } } }`
}
export default {
  data() {
    return {
      registrations: false,
      dialog: false,
      formdata: {
        codeTitle: '',
      },
    }
  },
  methods: {
    async onSave(event) {
      console.log('Saving the data')
      this.dialog = false
      const modelName = 'OfferCode'
      const newItemMutation = buildMutationCreateQuery(modelName)
      const userCreated = await this.$apollo.mutate({
        mutation: gql(newItemMutation),
        variables: {
          Inputs: {
            data: this.formdata,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      console.log('Form data added', userCreated)
    },
  },
}
</script>

<style>
.slide-form {
  position: fixed !important;
  right: 0 !important;
  bottom: 0 !important;
  width: calc(100% - 300px) !important;
  max-height: calc(100% - 100px) !important;
}
.stepper-box {
  min-height: 650px;
}
.slide-form-default {
  position: fixed !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 50% !important;
}
@media (max-width: 600px) {
  .slide-form,
  .slide-form-default {
    width: 100% !important;
    position: unset !important;
  }
}
</style>
