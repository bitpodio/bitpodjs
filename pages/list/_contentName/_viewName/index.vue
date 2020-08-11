<template>
  <v-layout column>
    <v-flex xs12 sm12 md12>
      <ViewDropdown
        :content="content[$route.params.contentName]"
        :view-name="$route.params.viewName"
        :content-name="$route.params.contentName"
      />
    </v-flex>
    <v-flex xs12 sm12 md12>
      <Grid
        :content="content[$route.params.contentName]"
        :view-name="$route.params.viewName"
        :content-name="$route.params.contentName"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Grid from '~/components/common/grid'
import content from '~/config/apps/event/content'
import ViewDropdown from '~/components/common/viewDropdown'
export default {
  components: {
    Grid,
    ViewDropdown,
  },
  data() {
    return {
      content: content(this),
    }
  },
  created() {},
}
</script>
