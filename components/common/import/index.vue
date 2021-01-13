<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on">
          <i class="fa fa-download iconSize mr-1" aria-hidden="true"></i>
          <i18n path="Common.Import" />
        </v-btn>
      </template>
      <template>
        <v-card class="invite-form">
          <v-card-title
            class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
          >
            <h2 class="black--text pt-4 pb-2 text-h5">
              <i18n path="Common.ImportData" />
            </h2>
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
                <i18n path="Common.CsvFileMust" />
              </h4>
              <a :href="getDownloadLink()"
                ><i18n path="Common.DownloadSampleFile"
              /></a>
              <div class="fieldTable my-2">
                <v-simple-table dense class="wrapper">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          <i18n path="Common.FieldName" />
                        </th>
                        <th class="text-left element">
                          <i18n path="Common.DataType" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in templateData" :key="index">
                        <td>{{ item }}</td>
                        <td class="element"><i18n path="Common.String" /></td>
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
                  ><i18n path="Common.ChooseFile"
                /></v-btn>
                <div class="pt-1 pl-2">
                  {{
                    fileList.length ? fileList[0].name : $t('Common.FileChosen')
                  }}
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
              ><i18n path="Common.Import"
            /></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="true" width="2px">
      <div class="fs-16 text-center">
        {{ snackbarText }}
      </div>
    </v-snackbar>
  </v-col>
</template>
<script>
import File from '~/components/common/form/file.vue'
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
      snackbarText: '',
      timeout: 3000,
      snackbar: false,
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
      const url = this.$bitpod.getApiUrl()
      const mappingRes = await this.$axios.$get(
        `${url}mappings?filter={"where":{"mappingName":"${this.modelName}"}}`
      )
      try {
        const formData = new FormData()
        formData.append('file', this.selectedFile)
        formData.append('mappingId', mappingRes[0].id)
        const res = await this.$axios.post(
          `${url}jobDetails/importData`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        if (res) {
          if (this.modelName === 'Attendee') {
            const obj = res.data.res
            const importObj = {
              Type: obj.modelName,
              Status: obj.processStatus,
              JobId: obj.jobId,
              EventId: this.$route.params.id,
            }
            await this.$axios.post(`${url}ImportJobs`, importObj)
            this.$parent.$parent.refresh()
          }
          this.snackbarText = this.$t('Messages.Success.ContactImportSuccess')
          this.snackbar = true
          this.$emit('contacts-imported')
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
