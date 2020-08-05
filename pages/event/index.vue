<template>
  <v-layout column justify-center align-center>
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
// import Grid from '~/components/common/test';
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
  async created() {
    if (!this.$apolloHelpers.getToken()) {
      let token = this.$auth.strategy.token.get()
      token = token.split(' ')[1]
      await this.$apolloHelpers.onLogin(token, undefined, { expires: 7 })
    }
  },
  state() {
    return this.$auth.state
  },
}
</script>
