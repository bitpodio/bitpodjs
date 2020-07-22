<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12 md12>
      <Grid
        :content="content.EventsManagement"
        view-name="All Events"
        search=""
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Grid from '~/components/common/grid'
// import Grid from '~/components/common/test';
import content from '~/config/apps/event/content'
export default {
  components: {
    Grid,
  },
  data() {
    return {
      content,
    }
  },
  created() {},
}
</script>
