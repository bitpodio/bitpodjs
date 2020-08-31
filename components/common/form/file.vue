<template>
  <div>
    <v-file-input
      multiple
      :label="field.caption"
      :rules="rules"
      @change="onChange"
    ></v-file-input>
  </div>
</template>
<script>
export default {
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
