<template>
  <div style="position: relative;">
    <h3
      class="font-weight-regular"
      style="position: absolute; top: -12px; left: 8px;"
    >
      {{ field.caption }}
    </h3>
    <v-btn
      class="blue white--text uploadFile"
      small
      :disabled="allowSecondUpload"
      @click="uploadClicked"
      >Upload</v-btn
    >
    <v-file-input
      v-if="!allowSecondUpload"
      ref="test"
      class="pl-2"
      :multiple="field.multiple"
      :rules="rules"
      :hide-input="true"
      prepend-icon="mdi-cloud-upload"
      @change="onChange"
    ></v-file-input>
    <div :class="{ 'pt-12': allowSecondUpload }">
      <div
        v-for="file in files"
        :key="file.id"
        class="ma-2 grey lighten-2 pa-2 rounded-sm"
      >
        <v-icon class="float-right" @click="deleteFile(file.id)"
          >mdi-close</v-icon
        >
        <a :href="getAttachmentLink(file.id, true)">{{ file.name }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { formFieldMixin } from '~/utility/form-control'
import nuxtconfig from '~/nuxt.config'
export default {
  mixins: [formFieldMixin],
  props: ['value', 'field', 'rules'],
  data() {
    return {
      fileIds: this.value,
      files: [],
    }
  },
  computed: {
    allowSecondUpload() {
      return !this.field.multiple && !!this.value && !!this.value.length
    },
  },
  async mounted() {
    if (this.value && this.value.length) {
      const fileDetailPromises = this.value.map((id) => this.getFileDetails(id))
      const fileDetails = await Promise.all(fileDetailPromises)
      this.files = fileDetails.map(({ data }) => {
        return {
          id: data.id,
          name: data.fileName,
        }
      })
    }
  },
  methods: {
    getAttachmentLink(id, isDownloadLink) {
      const attachmentUrl = `https://${nuxtconfig.axios.eventUrl}${
        nuxtconfig.axios.apiEndpoint
      }Attachments${isDownloadLink ? '/download' : ''}${id ? '/' + id : ''}`
      return attachmentUrl
    },
    uploadClicked() {
      this.$refs.test.$el.firstElementChild.firstElementChild.firstElementChild.click()
    },
    async onChange(files) {
      const fileUploadPromises = files.map((file) => this.uploadFile(file))
      const attachmentResp = await Promise.all(fileUploadPromises)
      this.fileIds = attachmentResp.map(({ data }) => {
        return {
          id: data.id,
          name: data.fileName,
        }
      })
      this.files.push(...this.fileIds)
      this.$emit(
        'input',
        this.files.map((i) => i.id)
      )
    },
    uploadFile(file) {
      const formData = new FormData()
      formData.append('file', file)
      return this.$axios.post(this.getAttachmentLink(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getFileDetails(id) {
      return this.$axios.get(this.getAttachmentLink(id))
    },
    async deleteFile(id) {
      await this.$axios.delete(this.getAttachmentLink(id))
      this.files = this.files.filter((i) => i.id !== id)
      this.$emit(
        'input',
        this.files.map((i) => i.id)
      )
    },
  },
}
</script>
