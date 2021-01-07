<template>
  <v-col class="text-center px-0">
    <v-dialog v-model="menu" :close-on-content-click="false" max-width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          small
          :color="value.length > 0 ? 'blue' : 'text--primary'"
          class="filter-btn"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left> fa-filter</v-icon> <i18n path="Common.Filter" />
        </v-btn>
      </template>

      <v-card class="filter-dialog-content">
        <div class="mb-2">
          <span class="text--primary body-1">
            <v-icon class="pr-1">fa-filter</v-icon> <i18n path="Common.Filter"
          /></span>
        </div>
        <div
          class="filter-fields-container pl-1"
          :class="
            rules && rules.length > 0
              ? 'filter-fields-scroll'
              : 'filter-fields-scroll-reset'
          "
        >
          <div
            v-for="[index, filterRule] of rules.entries()"
            :key="index + filterRule.field + ruleCondition"
          >
            <div class="d-block">
              <div class="filter-rule-item">
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
                      <v-icon class="pr-2">fa-trash</v-icon>
                      <v-list-item-title
                        ><i18n path="Drawer.Delete"
                      /></v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="onRuleDuplicate(index)">
                      <v-icon class="pr-2">mdi-content-copy</v-icon>
                      <v-list-item-title
                        ><i18n path="Common.Duplicate"
                      /></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            text
            depressed
            color="primary"
            class="filter-btn mt-2"
            @click="onAddFilter"
            ><i18n class="d-block" path="Common.AddFilter"
          /></v-btn>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel"><i18n path="Drawer.Cancel" /></v-btn>
          <v-btn color="primary" text @click="onApply"
            ><i18n path="Common.Apply"
          /></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      backupRules: [],
      filterCount: 0,
    }
  },
  watch: {
    menu(newVal) {
      if (newVal && this.backupRules.length) {
        this.rules.push(...this.backupRules)
        this.backupRules = []
      }
      if (newVal === true && this.filterCount === 0) {
        this.filterCount = 1
        this.onAddFilter()
      }
    },
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
      this.backupRules = []
      const { rules, ruleCondition } = this
      this.$emit('input', { rules, ruleCondition })
    },
    setFieldValues(fieldName, filterValues) {
      this.filterFields[fieldName] = filterValues
      this.filterFields = { ...this.filterFields }
    },
    onAddFilter() {
      this.rules = [
        ...this.rules,
        { field: '', operator: 'contains', value: '' },
      ]
    },
    onRuleDelete(index) {
      if (this.rules.length > 1) {
        this.backupRules.push(this.rules[index])
        this.rules = this.rules.filter((_, i) => i !== index)
      }
    },
    onRuleDuplicate(index) {
      this.rules = [...this.rules, { ...this.rules[index] }]
    },
    onRuleConditionChange(condition) {
      this.ruleCondition = condition
    },
    onCancel() {
      this.menu = false
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
  .filter-fields-scroll {
    overflow: scroll;
    height: 50vh;
    overflow-x: hidden;
  }
  .filter-fields-scroll-reset {
    height: 0;
  }
  .filter-fields-container .filter-rule-item:last-child {
    border-bottom: none;
  }
}
</style>
