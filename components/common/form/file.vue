<template>
  <div>
    <div v-show="field.caption" style="position: relative;">
      <h3
        class="font-weight-regular"
        style="position: absolute; top: -12px; left: 8px;"
      >
        {{ field.caption }}
      </h3>
      <v-btn
        class="primary uploadFile"
        small
        depressed
        :disabled="allowSecondUpload"
        @click="uploadClicked"
        >{{ label }}</v-btn
      >
      <v-file-input
        v-if="!allowSecondUpload"
        ref="test"
        class="pl-2"
        :multiple="field && field.multiple"
        :rules="rules"
        :hide-input="true"
        :accept="accept"
        prepend-icon="mdi-cloud-upload"
        @change="onChange"
      ></v-file-input>
    </div>
    <div v-if="!hidePreview" :class="{ 'pt-12': allowSecondUpload }">
      <div
        v-for="file in files"
        :key="file.id"
        class="ma-2 grey lighten-2 pa-2 rounded-sm"
      >
        <v-icon class="float-right" @click="deleteFile(file.id)"
          >mdi-close</v-icon
        >
        <a class="text-h7" :href="getAttachmentLink(file.id, true)">{{
          file.name
        }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { formFieldMixin } from '~/utility/form-control'
import nuxtconfig from '~/nuxt.config'
export default {
  mixins: [formFieldMixin],
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    field: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Array,
      default: () => [],
    },
    hidePreview: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Upload',
    },
    openFileDialog: {
      type: Boolean,
      default: () => false,
    },
    accept: {
      type: String,
      default: '',
    },
    customUpload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileIds: this.value,
      files: [],
    }
  },
  computed: {
    allowSecondUpload() {
      if (this.value) {
        return !this.field.multiple && !!this.value.length
      } else {
        return false
      }
    },
  },
  watch: {
    openFileDialog(newVal, oldVal) {
      this.uploadClicked()
    },
    value(newVal, oldVal) {
      if (!newVal.length) {
        this.files = []
      }
    },
  },
  async mounted() {
    if (this.value && this.value.length) {
      const fileDetailPromises = this.value.map((id) => this.getFileDetails(id))
      const fileDetails = await Promise.all(fileDetailPromises)
      this.files = fileDetails
        .filter((i) => i)
        .map(({ data }) => {
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
      this.$emit('updatedFileList', this.files)
    },

    uploadFile(file) {
      if (!this.customUpload) {
        const formData = new FormData()
        formData.append('file', file)
        return this.$axios.post(this.getAttachmentLink(), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      } else {
        this.$emit('customUpload', file)
        return {
          data: {
            id: file.size,
            fileName: file.name,
          },
        }
      }
    },
    getFileDetails(id) {
      return this.$axios.get(this.getAttachmentLink(id)).catch((e) => {
        console.error(e)
      })
    },
    async deleteFile(id) {
      await this.$axios.delete(this.getAttachmentLink(id))
      this.files = this.files.filter((i) => i.id !== id)
      this.$emit(
        'input',
        this.files.map((i) => i.id)
      )
      this.$emit('updatedFileList', this.files)
    },
  },
}
</script>
