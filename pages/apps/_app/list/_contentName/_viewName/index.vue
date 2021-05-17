<template>
  <v-layout column :class="listLayoutClass">
    <v-flex
      v-if="content"
      class="d-flex align-center"
      :class="{ 'mb-6': $device.isIos, 'negative-margin': !$device.isIos }"
      xs12
      sm12
      md12
    >
      <v-btn v-if="hasGoBack" class="ml-n3" icon @click="goBack">
        <v-icon class="fs-30">mdi-chevron-left</v-icon>
      </v-btn>
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
  data: () => {
    return {
      shouldGoBack: [
        'Event/eventInvitaionHistory',
        'EventIntegration/integrations',
        'Contacts/Invites',
      ],
    }
  },
  computed: {
    content() {
      return this.contents
        ? this.contents[this.$route.params.contentName]
        : null
    },
    hasGoBack() {
      return this.shouldGoBack.includes(
        `${this.$route.params.contentName}/${this.$route.params.viewName}`
      )
    },
    listLayoutClass() {
      return `${this.$route.params.contentName}-${this.$route.params.viewName}`
    },
  },
  methods: {
    goBack() {
      this.$router.back()
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
