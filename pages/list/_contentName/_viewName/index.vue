<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12>
      <Grid
        :content="content[$route.params.contentName]"
        :view-name="$route.params.viewName"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Grid from '~/components/common/grid'
import content from '~/config/apps/event/content'
export default {
  middleware: ['auth'],
  components: {
    Grid,
  },
  data() {
    // console.log(`content() = ${JSON.stringify(content())}`)
    return {
      content: content(),
    }
  },
  created() {},
}
</script>
