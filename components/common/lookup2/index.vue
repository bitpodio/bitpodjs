<script>
export default {
  data() {
    return {
      name: 'Anne',
    }
  },
}
</script>

<template>
  <div>
    <input v-model="name" placeholder="Enter your name" />

    <ApolloQuery
      :query="
        (gql) => gql`
          query($filters: JSON) {
            GeneralConfiguration {
              GeneralConfigurationFind(filter: $filters) {
                edges {
                  node {
                    id
                    value
                    key
                  }
                }
              }
            }
          }
        `
      "
      :variables="{ filters: {} }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ data.hello }}</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>
