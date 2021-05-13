<template>
  <div class="greybg">
    <confirm ref="confirm"></confirm>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true">
      <div class="text-center">{{ snackbarText }}</div>
    </v-snackbar>
    <v-card
      v-for="item in items"
      :key="item.id"
      class="mb-4 mx-auto elevation-1 rounded-lg feed-section"
    >
      <v-list subheader two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar size="48" color="primary">
              <span class="white--text Twitter">{{ item.createdBy }}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.createdBy }}</v-list-item-title>

            <v-list-item-subtitle>
              <timeAgo :date="item.createdDate"
            /></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <div v-if="item.createdBy === $auth.user.data.email">
              <v-menu
                left
                bottom
                :offset-y="offset"
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon small v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <i class="fa fa-pencil mt-1" aria-hidden="true"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Drawer.Edit"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="deleteFeed(item.id)">
                    <v-list-item-icon class="mr-2">
                      <i class="fa fa-trash mt-1" aria-hidden="true"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title
                        ><i18n path="Drawer.Delete"
                      /></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div class="mx-4 mb-2">
        <div>
          <div class="mt-n2 mb-2">{{ item.Title }}</div>
          <div class="mb-1">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="item.Body"></div>
          </div>
        </div>
        <div v-if="item.Likes.length > 0" class="mb-1">
          <div class="d-flex mb-2">
            <v-tooltip bottom content-class="feed-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-icon class="fs-16 mr-1" color="primary"
                    >mdi-thumb-up</v-icon
                  >
                  <span>{{ item.Likes.length }}</span>
                </div>
              </template>
              <span v-for="i in item.Likes" :key="i"
                ><div>{{ i }}</div></span
              >
            </v-tooltip>
            <v-spacer></v-spacer>
            <div v-if="item._Comment.length > 0" class="body-2">
              <span>{{ item._Comment.length }}</span>
              <i18n v-if="item._Comment.length === 1" path="Common.Comment" />
              <i18n v-if="item._Comment.length > 1" path="Common.Comments" />
            </div>
          </div>
        </div>
        <div><v-divider></v-divider></div>
        <div class="d-flex py-1">
          <div>
            <v-btn
              :id="item.id"
              text
              small
              :class="getLikeActive(item)"
              @click="feedLike(item)"
            >
              <v-icon left>
                mdi-thumb-up
              </v-icon>
              <i18n path="Common.Like" />
            </v-btn>
          </div>
          <div>
            <v-btn text small class="ml-4">
              <v-icon left>
                fa-message-square
              </v-icon>
              <i18n path="Common.Comment" />
            </v-btn>
          </div>
        </div>
        <div class="mb-2"><v-divider></v-divider></div>
        <div>
          <Notes
            model-name="Feeds"
            :feed-id="item.id"
            :commnet-label="true"
            :commnet-action="true"
          />
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import timeAgo from '~/components/common/timeAgo'
import Notes from '~/components/common/notes'
export default {
  components: {
    timeAgo,
    Notes,
  },
  props: {
    items: { type: Array, default: () => [] },
    offset: { type: Boolean, default: false },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
  },
  data() {
    return {
      like: false,
      snackbar: false,
      timeout: 3000,
      snackbarText: this.$t('Messages.Success.FeedDeletedSuccessfully'),
    }
  },
  methods: {
    getRandomColor(createdBy) {
      return window.GeoPattern.generate(createdBy).color
    },
    getLikeActive(item) {
      if (item.Likes && item.Likes.length) {
        return item.Likes.includes(this.$auth.user.data.email)
          ? 'primary--text'
          : ''
      }
      return ''
    },
    async feedLike(item) {
      const url = `${this.$bitpod.getApiUrl()}Feeds/${item.id}/hits/rel/${
        this.$auth.user.data.email
      }`
      try {
        if (item.Likes.includes(this.$auth.user.data.email)) {
          const res = await this.$axios.delete(`${url}`)
          if (res) {
            this.refresh()
          }
        } else {
          const putRes = await this.$axios.put(`${url}`)
          if (putRes) {
            this.refresh()
          }
        }
      } catch (error) {
        console.error(
          `Error in Save function of new recurring event form , context: create event, baseUrl: error: ${error}`
        )
      }
    },
    async deleteFeed(id) {
      const url = this.$bitpod.getApiUrl()
      try {
        const check = await this.$refs.confirm.open(
          this.$t('Drawer.DeleteFeed'),
          this.$t('Messages.Warn.DeleteFeed'),
          { color: 'error lighten-1' }
        )
        if (check === true) {
          const res = await this.$axios.$delete(`${url}Feeds/${id}`)
          if (res) {
            this.snackbarText = this.$t(
              'Messages.Success.FeedDeletedSuccessfully'
            )
            this.snackbar = true
            this.$eventBus.$emit('grid-refresh')
          }
        }
      } catch (e) {
        console.error(
          `Error in config/templates/grids/feed-grid/body.vue while making a DELETE call to Event model in method deleteEvent context: EventId:-${id} \n URL:- ${url} `,
          e
        )
      }
    },
  },
}
</script>
<style scoped>
.feed-section {
  min-width: 600px;
  max-width: 600px;
}
.feed-section:last-child {
  margin-bottom: -8px !important;
}
.feed-section
  .v-application--is-ltr
  .v-textarea.v-text-field--enclosed
  .v-text-field__slot
  textarea {
  height: 30px !important;
}
@media (max-width: 600px) {
  .feed-section {
    min-width: 100%;
    max-width: 100%;
  }
}
</style>
