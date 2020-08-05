<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Edit Item
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="field in fields"
                :key="`${field.fieldName}${updateCount}`"
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
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
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

function buildMutationUpsertQuery(modelName) {
  return `mutation($Inputs : ${modelName}UpsertWithWhereInput!){ ${modelName}{ ${modelName}UpsertWithWhere(input:$Inputs){ clientMutationId obj{ id } } } }`
}

export default {
  components: {
    TextField,
    Lookup,
    Checkbox,
  },
  //   mixins: [myMixin],
  props: ['content', 'viewName', 'item'],
  data() {
    const fields = getGridFields(this.content, this.viewName)
    return {
      fields,
      formData: this.item,
      dialog: false,
      updateCount: 0,
    }
  },
  computed: {
    editData() {
      return this.item
    },
  },
  watch: {
    item(newValue, oldValue) {
      this.updateCount = this.updateCount + 1
      this.formData = newValue
    },
  },
  beforeUpdate() {
    console.log('update called')
  },
  methods: {
    async onSave() {
      this.dialog = false
      const modelName = 'Registration'
      const where = {
        id: this.formData.id,
      }
      const editItemMutation = buildMutationUpsertQuery(modelName)
      const userCreated = await this.$apollo.mutate({
        mutation: gql(editItemMutation),
        variables: {
          Inputs: {
            where,
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
