<template>
  <div>
    <div style="min-height: 52px;">
      <v-flex v-if="content" xs12 sm12 md12>
        <ViewDropdown
          :content="content"
          :view-name="$route.params.viewName"
          :content-name="$route.params.contentName"
        />
      </v-flex>
    </div>
    <h1 class="ma-0">Page2</h1>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
    <h1>Scheduling assistant for paid or free events</h1>
    <p>
      Powerful meeting scheduling solution, which allows you to set up recurring
      sessions and accept appointments based on availability.
    </p>
  </div>
</template>

<script>
import ViewDropdown from '~/components/common/viewDropdown'
import { configLoaderMixin } from '~/utility'

export default {
  ayout: 'event',
  middleware: ['auth'],
  components: {
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
