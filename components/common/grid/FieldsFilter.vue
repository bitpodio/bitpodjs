<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="400"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          :color="value.length > 0 ? 'blue' : 'black'"
          v-bind="attrs"
          v-on="on"
        >
          filter
        </v-btn>
      </template>

      <v-card class="filter-dialog-content">
        <div>Filter</div>
        <v-divider></v-divider>
        <div class="filter-fields-container">
          <div
            v-for="[index, filterRule] of value.entries()"
            :key="index + filterRule.field + filterRule.value"
            class="filter-rule-item"
          >
            <FieldFilter
              :filter-rule="filterRule"
              :fields="fields"
              :index="index"
            />
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="onRuleDelete(index)">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
                <v-list-item @click="onRuleDuplicate(index)">
                  <v-list-item-title>Duplicate</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-spacer></v-spacer>
          <v-btn text @click="onAddFilter">+ Add a filter</v-btn>
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
    isFilterApplied: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Array,
      default: () => {},
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
      const { value } = this
      this.$emit('input', value)
    },
    setFieldValues(fieldName, filterValues) {
      this.filterFields[fieldName] = filterValues
      this.filterFields = { ...this.filterFields }
    },
    onAddFilter() {
      const fieldName = Object.keys(this.fields)[0]
      this.value = [
        ...this.value,
        { field: fieldName, operator: 'contains', value: '' },
      ]
    },
    onRuleDelete(index) {
      this.value = this.value.filter((_, i) => i !== index)
    },
    onRuleDuplicate(index) {
      this.value = [...this.value, { ...this.value[index] }]
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
.filter-rule-item {
  display: flex;
  align-items: center;
}
</style>
