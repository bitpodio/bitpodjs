<template>
  <v-layout column>
    <v-flex xs12 sm12 md12>
      <div>
        <ViewDropdown :content="content['Registrations']" />
      </div>
      <Grid view-name="Registrations" search="" content-name="Registrations" />
    </v-flex>
  </v-layout>
</template>

<script>
import ViewDropdown from '~/components/common/viewDropdown'
import Grid from '~/components/common/grid'
import content from '~/config/apps/event/content'

export default {
  middleware: ['auth'],
  components: {
    Grid,
    ViewDropdown,
  },
  data() {
    return {
      content: content(this),
    }
  },
}
</script>
