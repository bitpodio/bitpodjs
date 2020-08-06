<template>
  <div>
    <v-btn color="primary" dark @click="onDelete">
      Delete
    </v-btn>
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
    }
  },
  beforeUpdate() {
    console.log('update called')
  },
  methods: {
    async onDelete() {
      this.dialog = false
      const modelName = getModelName(this.content, this.viewName)
      const deleteItemMutation = buildMutationDeleteQuery(modelName)
      const userDeleted = await this.$apollo.mutate({
        mutation: gql(deleteItemMutation),
        variables: {
          Inputs: {
            id: this.item[0].id,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      console.log(userDeleted)
    },
  },
}
</script>
