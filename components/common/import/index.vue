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
          <i class="fa fa-download fs-18 mr-1" aria-hidden="true"></i>
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
              <v-btn
                icon
                @click=";(dialog = false), (fileList = []), (errorMessage = '')"
              >
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
              <div :class="fieldTableContact">
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
                        <th class="text-left element">
                          <i18n path="Common.Required" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in templateData" :key="index">
                        <td>{{ item.Field }}</td>
                        <td class="element"><i18n path="Common.String" /></td>
                        <td class="element">
                          <v-checkbox
                            v-model="item.Required"
                            :success="item.Required"
                            :error="item.Required"
                            dense
                            disabled
                            height="20"
                            class="ma-0 pa-0 required"
                          ></v-checkbox>
                        </td>
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
              <div v-if="errorMessage !== ''" class="error--text">
                {{ errorMessage }}
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
              ><i18n path="Common.Import" /><v-icon
                v-show="keyPressed"
                right
                dark
              >
                mdi-spin mdi-loading mdi-24px
              </v-icon></v-btn
            >
            <div class="fs-14 pl-3 statusMessage primary--text">
              {{ statusMessage }}
            </div>
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
      keyPressed: false,
      fieldTableContact: 'fieldTableContact my-2',
      fieldTableAttendee: 'fieldTable my-2',
      statusMessage: '',
      errorMessage: '',
    }
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        this.statusMessage = ''
      }
    },
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
      this.errorMessage = ''
      this.keyPressed = true
      this.statusMessage = this.$t('Messages.Success.ContactImportSuccess')
      this.fileList = []
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
            const importJobResponse = await this.$axios.post(
              `${url}ImportJobs`,
              importObj
            )
            if (importJobResponse) {
              let success = 0
              while (success !== 1) {
                const response = await this.$axios.get(
                  `${url}jobDetails/${obj.jobId}`
                )
                if (response.data.processStatus === 'Success') {
                  this.dialog = false
                  success = 1
                  this.snackbarText = this.$t('Common.AttendeeImportSuccess')
                  this.snackbar = true
                  this.fileList = []
                  this.keyPressed = false
                } else if (response.data.processStatus === 'Failure') {
                  if (
                    response.data.processSummary.errorDetails &&
                    response.data.processSummary.errorDetails[0] &&
                    response.data.processSummary.errorDetails[0].failedIndexes
                      .length
                  ) {
                    this.errorMessage = this.$t(
                      'Messages.Error.ImportFailedMessage',
                      {
                        index:
                          response.data.processSummary.errorDetails[0]
                            .failedIndexes[0],
                      }
                    )
                  } else if (response.data.errorCode) {
                    this.errorMessage = this.$t(
                      'Messages.Error.AttendeeImportFailed'
                    )
                  }
                  this.statusMessage = this.$t('Messages.Error.ImportFailed')
                  this.keyPressed = false
                  this.fileList = []
                  break
                }
              }
            }
            this.$eventBus.$emit('grid-refresh')
          }
          if (this.modelName === 'Contact') {
            const jobId = res.data.res.jobId
            let success = 0
            while (success !== 1) {
              const response = await this.$axios.get(
                `${url}jobDetails/${jobId}`
              )
              if (response.data.processStatus === 'Success') {
                this.dialog = false
                success = 1
                this.snackbarText = this.$t('Messages.Success.ContactImported')
                this.snackbar = true
                this.fileList = []
                this.keyPressed = false
              } else if (response.data.processStatus === 'Failure') {
                if (
                  response.data.processSummary.errorDetails &&
                  response.data.processSummary.errorDetails[0] &&
                  response.data.processSummary.errorDetails[0].failedIndexes
                    .length
                ) {
                  this.errorMessage = this.$t(
                    'Messages.Error.ImportFailedMessage',
                    {
                      index:
                        response.data.processSummary.errorDetails[0]
                          .failedIndexes[0],
                    }
                  )
                } else if (response.data.errorCode) {
                  this.errorMessage = this.$t(
                    'Messages.Error.DuplicateErrorMessage'
                  )
                }
                this.statusMessage = this.$t('Messages.Error.ImportFailed')
                this.snackbarText = this.$t(
                  'Messages.Success.ContactImportedFailed'
                )
                this.snackbar = true
                this.keyPressed = false
                this.fileList = []
                break
              }
            }
            this.$eventBus.$emit('grid-refresh')
          }
        }
      } catch (e) {
        console.error(
          `Error in components/common/import/index.vue while calling importContacts function context: ModelName =${this.modelName}`,
          e
        )
      }
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
.fieldTableContact {
  width: 310px;
}
.required {
  position: relative;
  top: 10px;
  left: 10px;
}
.wrapper {
  border: 1px solid lightgray;
}
.element {
  border-left: 1px solid lightgray;
}
.statusMessage {
  height: 14px;
}
</style>
