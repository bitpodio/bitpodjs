<template>
  <v-col class="text-center px-0">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="500"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          small
          :color="value.length > 0 ? 'blue' : 'text--primary'"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left> fa-filter</v-icon> Filter
        </v-btn>
      </template>

      <v-card class="filter-dialog-content">
        <div class="mb-2">
          <span class="text--primary body-1">
            <v-icon class="pr-1">fa-filter</v-icon> Filter</span
          >
        </div>
        <div class="filter-fields-container">
          <div
            v-for="[index, filterRule] of rules.entries()"
            :key="index + filterRule.field + ruleCondition"
            class="filter-rule-item"
          >
            <FieldFilter
              :filter-rule="filterRule"
              :fields="fields"
              :index="index"
              :rule-condition="ruleCondition"
              @onRuleConditionChange="onRuleConditionChange"
            />
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="onRuleDelete(index)">
                  <v-icon class="pr-2">mdi-delete</v-icon>
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
                <v-list-item @click="onRuleDuplicate(index)">
                  <v-icon class="pr-2">mdi-content-copy</v-icon>
                  <v-list-item-title>Duplicate</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-spacer></v-spacer>
          <v-btn text color="primary" class="filter-btn" @click="onAddFilter"
            >+ Add a filter</v-btn
          >
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="onApply">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-col>
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
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      rules: [...this.value.rules] || [],
      ruleCondition: this.value.ruleCondition,
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
      const { rules, ruleCondition } = this
      this.$emit('input', { rules, ruleCondition })
    },
    setFieldValues(fieldName, filterValues) {
      this.filterFields[fieldName] = filterValues
      this.filterFields = { ...this.filterFields }
    },
    onAddFilter() {
      const fieldName = Object.keys(this.fields)[0]
      this.rules = [
        ...this.rules,
        { field: fieldName, operator: 'contains', value: '' },
      ]
    },
    onRuleDelete(index) {
      this.rules = this.rules.filter((_, i) => i !== index)
    },
    onRuleDuplicate(index) {
      this.rules = [...this.rules, { ...this.rules[index] }]
    },
    onRuleConditionChange(condition) {
      this.ruleCondition = condition
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
}
.filter-btn {
  width: fit-content;
}
@media (max-width: 600px) {
  .filter-rule-item {
    background: transparent;
    padding: 5px;
    margin-bottom: 20px;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
  }
  .filter-fields-container .filter-rule-item:last-child {
    border-bottom: none;
  }
}
</style>
