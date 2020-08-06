<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-flex xs12 sm12 md12 mx-3>
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            New Item
          </v-btn>
        </v-flex>
      </template>
      <v-card>
        <v-toolbar dense flat dark fixed color="accent">
          <v-toolbar-title class="body-1">New Item</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="field in fields"
                :key="field.fieldName"
                cols="12"
                sm="6"
              >
                <component
                  :is="formControl(field) || null"
                  v-model="formData[field.fieldName]"
                  :field="field"
                  :field-name="field.fieldName"
                  :content="content"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pl-4">
          <v-btn color="primary" depressed @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
// import TextField from '../../../../../../components/form/text-field.vue'
// import TextField from '~/components/form/text-field.vue'
import TextField from '~/components/common/form/text-field.vue'
import Lookup from '~/components/common/form/lookup.vue'
import Checkbox from '~/components/common/form/checkbox.vue'

function getGridFields(content, viewName) {
  const view = content.views[viewName]
  const fields = view.fields
  const editableFields = []
  for (const fieldName in fields) {
    const field = fields[fieldName]
    const newFormField = field.newForm === undefined ? true : field.newForm
    if (newFormField) {
      editableFields.push({
        ...field,
        fieldName,
      })
    }
  }
  editableFields.sort(
    (field1, field2) => field1.displayOrder - field2.displayOrder
  )
  return editableFields
}

function buildMutationCreateQuery(modelName) {
  return `mutation($Inputs : ${modelName}CreateInput!){ ${modelName} { ${modelName}Create(input:$Inputs){ clientMutationId obj{ id } } } }`
}

function getModelName(content, viewName) {
  const view = content.views[viewName]
  const dataSource = view.dataSource
  return dataSource.model
}

export default {
  components: {
    TextField,
    Lookup,
    Checkbox,
  },
  props: ['content', 'viewName'],
  data() {
    const fields = getGridFields(this.content, this.viewName)
    return {
      fields,
      formData: {},
      dialog: false,
    }
  },
  methods: {
    async onSave() {
      this.dialog = false
      const modelName = getModelName(this.content, this.viewName)
      const newItemMutation = buildMutationCreateQuery(modelName)
      this.formData.TotalAmount = parseInt(this.formData.TotalAmount)
      const userCreated = await this.$apollo.mutate({
        mutation: gql(newItemMutation),
        variables: {
          Inputs: {
            data: this.formData,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      console.log(userCreated)
    },
    formControl(field) {
      switch (field.type) {
        case 'string':
        case 'number':
          return 'TextField'
        case 'lookup':
          return 'Lookup'
        case 'checkbox':
          return 'Checkbox'
      }
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
