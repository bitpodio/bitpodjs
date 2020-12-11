<template>
  <v-layout column>
    <v-flex
      v-if="content"
      :class="{ 'mb-6': $device.isIOS, 'negative-margin': !$device.isIOS }"
      xs12
      sm12
      md12
    >
      <ViewDropdown
        :content="content"
        :view-name="$route.params.viewName"
        :content-name="$route.params.contentName"
      />
    </v-flex>
    <v-flex v-if="content" xs12 sm12 md12>
      <Grid
        :view-name="$route.params.viewName"
        :content="content"
        :only-sticky="true"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Grid from '~/components/common/grid'
import ViewDropdown from '~/components/common/viewDropdown'
import { configLoaderMixin } from '~/utility'

export default {
  components: {
    Grid,
    ViewDropdown,
  },
  mixins: [configLoaderMixin],
  computed: {
    content() {
      return this.contents
        ? this.contents[this.$route.params.contentName]
        : null
    },
  },
}
</script>
<style scoped>
@media (max-width: 600px) {
  .negative-margin {
    margin-bottom: -30px;
  }
}
</style>
