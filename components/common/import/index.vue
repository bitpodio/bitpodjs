<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <i class="fa fa-upload iconSize mr-1" aria-hidden="true"></i> Import
        </v-btn>
      </template>
      <template>
        <v-card class="invite-form">
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-4 pb-2 text-h5">Import Data</h2>
            <v-spacer></v-spacer>
            <div>
              <v-btn icon @click=";(dialog = false), (fileList = [])">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text
            class="px-xs-2 px-md-10 px-lg-10 px-xl-15 pt-0 invite-inner"
          >
            <div>
              <h4 class="font-weight-regular">
                CSV file must have following columns in order these are listed,
                for import process to work properly.
              </h4>
              <a :href="getDownloadLink()">Download Sample File</a>
              <div class="fieldTable my-2">
                <v-simple-table dense class="wrapper">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Field Name</th>
                        <th class="text-left element">Data Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in templateData" :key="index">
                        <td>{{ item }}</td>
                        <td class="element">string</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
              <File
                :field="fieldProps"
                :value="resetList"
                :open-file-dialog="attach"
                :hide-preview="true"
                :custom-upload="true"
                accept=".csv"
                @customUpload="updateSelectedFile"
                @updatedFileList="uploaded"
              />
              <div class="d-flex">
                <v-btn
                  small
                  @click="
                    attach = !attach
                    resetList = []
                  "
                  >Choose File</v-btn
                >
                <div class="pt-1 pl-2">
                  {{ fileList.length ? fileList[0].name : 'No file chosen' }}
                </div>
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions
            class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
          >
            <v-btn
              color="primary"
              depressed
              :disabled="!fileList.length"
              @click="importContacts"
              >Import</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-col>
</template>
<script>
import File from '~/components/common/form/file.vue'
import nuxtconfig from '~/nuxt.config'
export default {
  components: {
    File,
  },
  props: {
    sampleFileName: {
      type: String,
      default: '',
    },
    templateData: {
      type: Array,
      default: () => [],
    },
    modelName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      fieldProps: {
        multiple: false,
      },
      resetList: [],
      fileList: [],
      selectedFile: {},
    }
  },
  methods: {
    getDownloadLink() {
      return this.$config.cdnCsvUri + this.sampleFileName
    },
    uploaded(data) {
      this.fileList = [...data]
    },
    updateSelectedFile(data) {
      this.selectedFile = data
    },
    async importContacts() {
      try {
        const formData = new FormData()
        formData.append('file', this.selectedFile)
        formData.append('mappingId', nuxtconfig.mappingIds[this.modelName])
        const res = await this.$axios.post(
          `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}jobDetails/importData`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        if (res) {
          if (this.modelName === 'attendee') {
            const obj = res.data.res
            const importObj = {
              Type: obj.modelName,
              Status: obj.processStatus,
              JobId: obj.jobId,
              EventId: this.$route.params.id,
            }
            await this.$axios.post(
              `https://${nuxtconfig.axios.eventUrl}${nuxtconfig.axios.apiEndpoint}ImportJobs`,
              importObj
            )
            this.$parent.$parent.refresh()
          }
        }
      } catch (e) {
        console.log('Error', e)
      }
      this.dialog = false
      this.fileList = []
    },
  },
}
</script>
<style scoped>
.iconSize {
  font-size: 15px;
}
.fieldTable {
  width: 220px;
}
.wrapper {
  border: 1px solid lightgray;
}
.element {
  border-left: 1px solid lightgray;
}
</style>
