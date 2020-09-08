<template>
  <div>
    <v-file-input
      :multiple="field.multiple"
      :label="fieldCaption"
      :rules="rules"
      :hide-input="true"
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
      const AttachmentURL = 'https://event.test.bitpod.io/svc/api/Attachments'
      const formData = new FormData()

      formData.append('file', file)

      return this.$axios.post(AttachmentURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    getFileDetails(id) {
      const AttachmentURL = `https://event.test.bitpod.io/svc/api/Attachments/${id}`
      return this.$axios.get(AttachmentURL)
    },
    async deleteFile(id) {
      const AttachmentURL = `https://event.test.bitpod.io/svc/api/Attachments/${id}`
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
