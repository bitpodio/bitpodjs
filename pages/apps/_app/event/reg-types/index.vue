<template>
  <v-layout column>
    <v-flex v-if="content" class="d-flex" xs12 sm12 md12>
      <v-btn icon @click="onBackBtn">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <ViewDropdown
        :content="content"
        view-name="eventRegistrationType"
        content-name="RegistrationType"
      />
    </v-flex>
    <v-flex v-if="content" xs12 sm12 md12>
      <Grid view-name="eventRegistrationType" :content="content" />
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
      return this.contents ? this.contents.RegistrationType : null
    },
  },
  methods: {
    onBackBtn() {
      this.$router.back()
    },
  },
}
</script>
