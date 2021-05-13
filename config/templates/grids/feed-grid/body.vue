<template>
  <div class="greybg">
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
            <div>
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
                  <v-list-item>
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
          <div class="d-flex">
            <div>
              <v-btn icon color="primary">
                <v-icon class="fs-16">mdi-thumb-up</v-icon>
              </v-btn>
              <span>{{ item.Likes.length }}</span>
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
</style>
