<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="lighten-2" dark v-bind="attrs" v-on="on">
          Filter
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Filters
        </v-card-title>
        <div class="filter-dialog-content">
          <v-menu top :close-on-click="closeOnClick">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                Select Field
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(fieldDetails, fieldName) in fields"
                :key="fieldName"
                @click="onFieldNameClick(fieldDetails, fieldName)"
              >
                <v-list-item-title>{{
                  fieldDetails.caption
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-divider></v-divider>
          <div class="filter-fields-container">
            <div
              v-for="(filterValues, fieldName) in filterFields"
              :key="fieldName"
            >
              <FieldFilter
                :filter-values="filterValues"
                :field-name="fieldName"
                :fields="fields"
                :filter-fields="filterFields"
                @setFieldValues="setFieldValues"
              />
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="onApply">
            Apply
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FieldFilter from './FieldFilter.vue'
export default {
  components: {
    FieldFilter,
  },
  props: {
    fields: {
      type: Object,
      required: true,
    },
    filterFields: {
      type: Object,
      required: true,
    },
    isFilterApplied: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      filterInputSearchValues: {
        Title: new Date().toISOString().substr(0, 10),
      },
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
    }
  },
  computed: {
    fieldsList() {
      const fieldsList = []
      for (const fieldName in this.fields) {
        const { caption } = this.fields[fieldName] || {}
        fieldsList.push(caption)
      }
      return fieldsList
    },
  },
  methods: {
    onFieldNameClick(fieldDetails, fieldName) {
      debugger
      this.filterFields[fieldName] = new Set([])
      this.filterFields = { ...this.filterFields }
    },
    getFieldCaption(fieldName) {
      const { caption } = this.fields[fieldName] || {}
      return caption
    },
    onApply() {
      this.dialog = false
      this.$emit('update-filter', true, this.filterFields)
    },
    setFieldValues(fieldName, filterValues) {
      this.filterFields[fieldName] = filterValues
      this.filterFields = { ...this.filterFields }
      //   this.filterValues = new Set(filterValues)
    },
  },
}
</script>
<style scoped>
.filter-fields-container {
  display: flex;
}
.filter-fields-container > div {
  padding: 0 10px;
}
.filter-dialog-content {
  min-height: 50vh;
}
</style>
