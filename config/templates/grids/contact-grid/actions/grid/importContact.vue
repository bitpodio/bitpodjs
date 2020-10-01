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
              <v-btn icon @click="dialog = false">
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
              <a
                href="https://res.cloudinary.com/mytestlogo/raw/upload/v1573631144/Contact.csv"
                >Download Sample File</a
              >
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Field Name</th>
                      <th class="text-left">Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>FirstName</td>
                      <td>string</td>
                    </tr>
                    <tr>
                      <td>LastName</td>
                      <td>string</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>string</td>
                    </tr>
                    <tr>
                      <td>Organization</td>
                      <td>string</td>
                    </tr>
                    <tr>
                      <td>Job</td>
                      <td>string</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <File
                :field="fieldProps"
                :value="resetList"
                :open-file-dialog="attach"
                :hide-preview="true"
                accept=".csv"
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
              v-if="curentTab > 0"
              color="primary"
              depressed
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
export default {
  components: {
    File,
  },
  data() {
    return {
      dialog: false,
      fieldProps: {
        multiple: false,
      },
      resetList: [],
      fileList: [],
    }
  },
  methods: {
    uploaded(data) {
      this.fileList = [...data]
    },
    importContacts() {},
  },
}
</script>
<style scoped>
.iconSize {
  font-size: 15px;
}
</style>
