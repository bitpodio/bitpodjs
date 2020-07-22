<template>
  <!-- <div class="text-center">
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
  </div> -->
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="400"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark v-bind="attrs" v-on="on">
          filter
        </v-btn>
      </template>

      <v-card class="filter-dialog-content">
        <div>Filter</div>
        <v-divider></v-divider>
        <div class="filter-fields-container">
          <div
            v-for="[index, filterRule] of filterRules.entries()"
            :key="filterRule"
          >
            <FieldFilter
              :filter-rule="filterRule"
              :fields="fields"
              :index="index"
            />
          </div>
          <div @click="onAddFilter">+ Add a filter</div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="onApply">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
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
    filterRules: {
      type: Array,
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
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  methods: {
    onFieldNameClick(fieldDetails, fieldName) {
      this.filterFields[fieldName] = new Set([])
      this.filterFields = { ...this.filterFields }
    },
    getFieldCaption(fieldName) {
      const { caption } = this.fields[fieldName] || {}
      return caption
    },
    onApply() {
      this.menu = false
      const { filterRules } = this
      this.$emit('update-filter', true, filterRules)
    },
    setFieldValues(fieldName, filterValues) {
      this.filterFields[fieldName] = filterValues
      this.filterFields = { ...this.filterFields }
      //   this.filterValues = new Set(filterValues)
    },
    onAddFilter() {
      const fieldName = Object.keys(this.fields)[0]
      this.filterRules = [
        ...this.filterRules,
        { field: fieldName, operator: 'contains', value: '' },
      ]
    },
  },
}
</script>
<style scoped>
.filter-fields-container {
  display: flex;
  flex-direction: column;
}
.filter-dialog-content {
  padding: 10px;
}
</style>
