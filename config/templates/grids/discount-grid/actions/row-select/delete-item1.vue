<template>
  <div>
    <v-btn color="primary" dark @click="onDelete">
      Delete
    </v-btn>
    <v-snackbar v-model="snackbar" timeout="2000" top="true">
      Item deleted successfully.

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import gql from 'graphql-tag'

function buildMutationDeleteQuery(modelName) {
  return `mutation($Inputs: ${modelName}DeleteByIdInput!){ ${modelName} { ${modelName}DeleteById(input:$Inputs){ clientMutationId } } }`
}

function getModelName(content, viewName) {
  const view = content.views[viewName]
  const dataSource = view.dataSource
  return dataSource.model
}

export default {
  //   mixins: [myMixin],
  props: ['content', 'viewName', 'items'],
  data() {
    return {
      dialog: false,
      updateCount: 0,
      snackbar: false,
    }
  },
  methods: {
    async onDelete() {
      this.dialog = false
      const modelName = getModelName(this.content, this.viewName)
      const deleteItemMutation = buildMutationDeleteQuery(modelName)
      await this.$apollo.mutate({
        mutation: gql(deleteItemMutation),
        variables: {
          Inputs: {
            id: this.items[0].id,
            clientMutationId: `${modelName} list item deleted successfully.`,
          },
        },
      })
      this.snackbar = true
    },
  },
}
</script>
