<template>
  <div>
    <confirm ref="confirm"></confirm>
    <v-snackbar v-model="snackbar" :timeout="2000" :top="true" width="2px">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
    <v-row>
      <v-col class="col-12 col-sm-8">
        <v-textarea
          v-model="message"
          :label="
            commnetLabel ? $t('Common.WriteaComment') : $t('Common.AddNote')
          "
          outlined
          dense
          row-height="18"
          auto-grow
        ></v-textarea>
        <div class="mt-n2 mb-5">
          <v-btn
            v-if="!fileList || !fileList.length"
            class="float-right"
            small
            color="primary"
            :disabled="!message"
            @click="uploadNote"
            ><i18n v-if="commnetAction === false" path="Drawer.Save" /><i18n
              v-if="commnetAction"
              path="Common.Comment"
          /></v-btn>
          <div
            class="grey--text cursorPointer d-flex tile"
            @click="attach = !attach"
          >
            <v-icon class="mdi-rotate-315" medium>mdi-attachment</v-icon>
            <h4 class="font-weight-regular ml-1 mt-1">
              {{ $t('Common.AttachFile') }}
            </h4>
          </div>
        </div>
        <File
          :field="fieldProps"
          :value="resetList"
          :open-file-dialog="attach"
          @input="uploaded"
        />
        <v-btn
          v-if="fileList && fileList.length"
          class="float-right mt-2"
          small
          color="primary"
          :disabled="!message"
          @click="uploadNote"
        >
          <i18n v-if="commnetAction === false" path="Drawer.Save" /><i18n
            v-if="commnetAction"
            path="Common.Comment"
        /></v-btn>
        <div :class="{ 'mt-16': fileList && fileList.length }">
          <div v-for="(comment, index) in existingComments" :key="comment.id">
            <v-hover v-slot:default="{ hover }">
              <div
                :class="{
                  extraComments: !showMore && index > 4,
                }"
              >
                <i
                  v-show="hover"
                  class="fa fa-trash float-right cursorPointer pa-3"
                  @click="deleteComment(comment.id)"
                ></i>
                <div
                  :class="{
                    borderBottomGrey: index < existingComments.length - 1,
                  }"
                >
                  <div class="d-flex py-2">
                    <div class="pr-3">
                      <v-avatar size="38">
                        <img
                          src="https://res.cloudinary.com/mytestlogo/image/upload/v1571395685/default_profile.png"
                          alt="John"
                        />
                      </v-avatar>
                    </div>
                    <div
                      class="v-data-table__wrapper"
                      :class="{ 'mr-10': !hover }"
                    >
                      <div class="blue--text">{{ comment.modifiedBy }}</div>
                      <div class="text-break-word">{{ comment.Notes }}</div>
                      <div v-if="comment.AttachmentId.length" class="gallery">
                        <div
                          v-for="attachment in comment.AttachmentId"
                          :key="attachment.id"
                          class="mr-2 d-inline-block"
                        >
                          <div class="image">
                            <div class="attachments text-center">
                              <v-img
                                contain
                                height="120"
                                width="120"
                                :src="getAttachmentLink(attachment, true)"
                              >
                                <template v-slot:placeholder>
                                  <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                                  >
                                    <v-icon>{{
                                      attachmentDetails[attachment] &&
                                      attachmentDetails[
                                        attachment
                                      ].contentType.includes('image')
                                        ? 'mdi-file-image'
                                        : 'mdi-file'
                                    }}</v-icon>
                                  </v-row>
                                </template></v-img
                              >
                            </div>
                            <div class="text-truncate image">
                              <a
                                class="text-h7"
                                :href="getAttachmentLink(attachment, true)"
                                >{{
                                  attachmentDetails[attachment] &&
                                  attachmentDetails[attachment].fileName
                                }}</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="grey--text">
                        <timeAgo :date="comment.modifiedDate" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-hover>
          </div>
        </div>
        <div
          v-if="existingComments && existingComments.length > 5"
          class="blue--text cursorPointer"
          @click="showMore = !showMore"
        >
          {{ showMore ? $t('Common.ShowLess') : $t('Common.ShowMore') }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import File from '../form/file.vue'
import timeAgo from '~/components/common/timeAgo'
export default {
  components: {
    File,
    timeAgo,
  },
  props: {
    modelName: {
      type: String,
      required: true,
    },
    feedId: {
      type: String,
      default: '',
    },
    commnetLabel: {
      type: Boolean,
      default: false,
    },
    commnetAction: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      message: '',
      fieldProps: {
        multiple: true,
      },
      attach: false,
      existingComments: [],
      fileList: [],
      resetList: [],
      snackbarText: '',
      snackbar: false,
      attachmentDetails: {},
      showMore: false,
    }
  },
  mounted() {
    this.fetchAllComments()
  },
  methods: {
    async deleteComment(id) {
      const confirmDeletion = await this.$refs.confirm.open(
        this.$t('Common.DeleteNote'),
        this.$t('Messages.Warn.DeleteComment'),
        { color: 'error lighten-1' }
      )
      if (confirmDeletion) {
        try {
          await this.$axios.delete(this.getLink(id))
          this.snackbarText = this.$t(
            'Messages.Success.CommentDeletedSuccessfully'
          )
          this.snackbar = true
          this.fetchAllComments()
        } catch (err) {
          this.snackbarText = this.$t('Messages.Success.FailedDeleteComment')
          this.snackbar = true
          return err
        }
      }
    },
    getTimeAgo(date) {
      return timeAgo(date)
    },
    getAttachmentLink(id, isDownloadLink) {
      const url = this.$bitpod.getApiUrl()
      const attachmentUrl = `${url}Attachments${
        isDownloadLink ? '/download' : ''
      }${id ? '/' + id : ''}`
      return attachmentUrl
    },
    getLink(id) {
      const url = this.$bitpod.getApiUrl()
      return `${url}${this.modelName}/${
        this.modelName === 'Feeds' ? this.feedId : this.$route.params.id
      }/${
        this.modelName === 'Events' || this.modelName === 'ESIGNREQUESTS'
          ? 'Comments'
          : 'Comment'
      }/${id || ''}`
    },
    uploaded(data) {
      this.fileList = [...data]
    },
    async uploadNote() {
      try {
        const commentUrl = this.getLink()
        await this.$axios.post(commentUrl, {
          AttachmentId: this.fileList,
          Notes: this.message,
        })
        this.fetchAllComments()
      } catch (err) {
        return err
      }
      this.fileList = []
      this.resetList = []
      this.message = ''
    },
    async fetchAllComments() {
      try {
        const res = await this.$axios.get(this.getLink())
        this.existingComments = [...res.data].reverse()
        this.getattachmentDetails()
      } catch (err) {
        return err
      }
    },
    getattachmentDetails() {
      try {
        this.existingComments.forEach((i) => {
          i.AttachmentId.forEach(async (j) => {
            const res = await this.$axios.get(this.getAttachmentLink(j))
            this.attachmentDetails[j] = res.data
          })
        })
      } catch (err) {
        return err
      }
    },
  },
}
</script>
<style scoped>
@media (min-width: 800px) {
  .gallery {
    width: 260px;
  }
}
.attachments {
  border: 1px solid lightgrey;
}
.image {
  width: 120px !important;
}
.tile {
  width: 160px !important;
}
.extraComments {
  display: none;
}
</style>
