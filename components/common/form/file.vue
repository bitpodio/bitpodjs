<template>
  <div style="position: relative;">
    <h3
      class="font-weight-regular"
      style="position: absolute; top: 16px; left: 40px;"
      @click="lableClicked"
    >
      {{ field.caption }}
    </h3>
    <v-file-input
      ref="test"
      :multiple="field.multiple"
      :rules="rules"
      :hide-input="true"
      prepend-icon="mdi-cloud-upload"
      @change="onChange"
    ></v-file-input>
    <div class="text-center">
      <v-chip
        v-for="file in files"
        :key="file.id"
        class="ma-2"
        close
        @click:close="deleteFile(file.id)"
      >
        {{ file.name }}
      </v-chip>
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
    lableClicked() {
      this.$refs.test.$el.firstElementChild.click()
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
      const AttachmentURL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Attachments`
      const formData = new FormData()
      formData.append('file', file)
      return this.$axios.post(AttachmentURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getFileDetails(id) {
      const AttachmentURL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Attachments/${id}`
      return this.$axios.get(AttachmentURL)
    },
    async deleteFile(id) {
      const AttachmentURL = `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}Attachments/${id}`
      await this.$axios.delete(AttachmentURL)
      this.files = this.files.filter((i) => i.id !== id)
      this.$emit(
        'input',
        this.files.map((i) => i.id)
      )
    },
  },
}
</script>
