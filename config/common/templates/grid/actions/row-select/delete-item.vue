<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="onDelete">
      <v-icon left>mdi-delete</v-icon>Delete
    </v-btn>
  </v-col>
</template>

<script>
import gql from 'graphql-tag'

function buildMutationDeleteQuery(modelName) {
  return `mutation($Inputs: ${modelName}DestroyAllInput!){ ${modelName} { ${modelName}DestroyAll(input:$Inputs){ clientMutationId } } }`
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
      debugger
      this.dialog = false
      const modelName = getModelName(this.content, this.viewName)
      const deleteItemMutation = buildMutationDeleteQuery(modelName)
      const userDeleted = await this.$apollo.mutate({
        mutation: gql(deleteItemMutation),
        variables: {
          Inputs: {
            where: {
              id: {
                inq: ['5f2c09ed427821000ae9c52a', '5f2c09ed427821000ae9c52c'],
              },
            }, // this.item[0].id,
            clientMutationId: `${modelName} list item updated successfully.`,
          },
        },
      })
      console.log(userDeleted)
    },
  },
}
</script>
