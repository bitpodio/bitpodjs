<template>
  <div>
    <v-file-input
      multiple
      :label="fieldCaption"
      :rules="rules"
      @change="onChange"
    ></v-file-input>
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
    }
  },
  methods: {
    async onChange(files) {
      const fileUploadPromises = files.map((file) => this.uploadFile(file))
      const attachmentResp = await Promise.all(fileUploadPromises)
      this.fileIds = attachmentResp.map(({ data }) => data.id)
      this.$emit('input', this.fileIds)
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
  },
}
</script>
