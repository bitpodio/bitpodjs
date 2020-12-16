<template>
  <div>
    <div
      class="d-flex align-start flex-wrap flex-sm-wrap flex-xl-nowrap flex-md-nowrap"
    >
      <i18n
        v-if="index === 0"
        path="Common.Where"
        class="pr-3 pt-3 filter-or"
      />
      <div v-else-if="index === 1" class="pr-3 filter-or">
        <v-select
          v-model="selectedConditionOperator"
          :items="conditionOperator"
          :label="$t('Common.FilterSelect')"
          single-line
          outlined
          dense
          @change="onRuleConditionChange"
        ></v-select>
      </div>
      <div v-else class="pr-3 pt-3 filter-or">
        {{ selectedConditionOperator }}
      </div>
      <v-select
        v-model="filterRule.field"
        :items="translate(fieldsList)"
        item-text="text"
        item-value="value"
        :label="$t('Common.SelectField')"
        single-line
        outlined
        dense
        class="pr-3 filter-field"
        @change="onFieldChange"
      ></v-select>
      <v-select
        v-model="filterRule.operator"
        :items="tanslateStringFilter(stringFilterOptions)"
        item-text="text"
        item-value="value"
        :label="$t('Common.Operator')"
        single-line
        outlined
        dense
        class="pr-3 filter-field"
      ></v-select>
      <div
        v-if="!nonInputOperators.includes(filterRule.operator)"
        class="pr-3 filter-value"
      >
        <div v-if="fieldType === 'date'">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            outlined
            dense
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                :label="$t('Common.EnterDate')"
                readonly
                v-bind="attrs"
                outlined
                dense
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              show-current="true"
              outlined
              dense
              @change="onCalendarChange"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div v-else-if="fieldType === 'number'">
          <v-text-field
            v-model="filterRule.value"
            :label="$t('Common.EnterValue')"
            type="number"
            dense
            outlined
            @keyup.enter="onFilterInput"
          ></v-text-field>
        </div>
        <div v-else-if="fieldType === 'checkbox'" class="mt-n3">
          <v-checkbox v-model="filterRule.value"></v-checkbox>
        </div>
        <div v-else-if="fieldType === 'lookup'">
          <Lookup
            v-model="filterRule.value"
            :field="fieldDetails"
            :field-name="filterRule.field"
          />
        </div>
        <div v-else>
          <v-text-field
            v-model="filterRule.value"
            :label="$t('Common.EnterValue')"
            type="text"
            outlined
            dense
            @keyup.enter="onFilterInput"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lookup from '../form/lookup.vue'
export default {
  components: {
    Lookup,
  },
  props: {
    filterRule: {
      type: Object,
      required: true,
    },
    fields: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    ruleCondition: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      menu2: false,
      date: this.filterRule.value || new Date().toISOString().substr(0, 10),
      textFieldInput: null,
      values: this.filterValues,
      stringOperatorOptions: {
        'FilterOptions.Is': 'is',
        'FilterOptions.IsNot': 'isNot',
        'FilterOptions.Contains': 'contains',
        'FilterOptions.DoesNotContain': 'notContains',
        'FilterOptions.StartsWith': 'startsWith',
        'FilterOptions.EndsWith': 'endsWith',
        'FilterOptions.IsEmpty': 'isEmpty',
        'FilterOptions.IsNotEmpty': 'isNotEmpty',
      },
      numberOperatorOptions: {
        '=': 'is',
        '≠': 'isNot',
        '>': 'gt',
        '<': 'lt',
        '≥': 'gte',
        '≤': 'lte',
        'FilterOptions.IsEmpty': 'isEmpty',
        'FilterOptions.IsNotEmpty': 'isNotEmpty',
      },
      dateOperatorOptions: {
        'FilterOptions.Today': 'today',
        'FilterOptions.Tomorrow': 'tomorrow',
        'FilterOptions.Yesterday': 'yesterday',
        'FilterOptions.ThePastWeek': 'pastWeek',
        'FilterOptions.ThePastMonth': 'pastMonth',
        'FilterOptions.ThePastYear': 'pastYear',
        'FilterOptions.TheNextWeek': 'nextWeek',
        'FilterOptions.TheNextMonth': 'nextMonth',
        'FilterOptions.TheNextYear': 'nextYear',
        'FilterOptions.ExactDate': 'exactDate',
        'FilterOptions.IsEmpty': 'isEmpty',
        'FilterOptions.IsNotEmpty': 'isNotEmpty',
      },
      checkboxOperatorOptions: {
        'FilterOptions.Is': 'is',
        'FilterOptions.IsNot': 'isNot',
      },
      lookupOperatorOptions: {
        'FilterOptions.Is': 'is',
        'FilterOptions.IsNot': 'isNot',
        'FilterOptions.IsEmpty': 'isEmpty',
        'FilterOptions.IsNotEmpty': 'isNotEmpty',
      },
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      conditionOperator: [
        this.$t('FilterOptions.And'),
        this.$t('FilterOptions.Or'),
      ],
      selectedConditionOperator: this.ruleCondition,
      nonInputOperators: [
        'isEmpty',
        'isNotEmpty',
        'today',
        'tomorrow',
        'yesterday',
        'pastWeek',
        'pastMonth',
        'pastYear',
        'nextWeek',
        'nextMonth',
        'nextYear',
      ],
    }
  },
  computed: {
    fieldType() {
      const { type } = this.fields[this.filterRule.field] || {}
      return type
    },
    stringFilterOptions() {
      const stringFilterList = []
      const { type } = this.fields[this.filterRule.field] || {}
      let operatorObject = {}
      switch (type) {
        case 'string':
          operatorObject = this.stringOperatorOptions
          break
        case 'number':
          operatorObject = this.numberOperatorOptions
          break
        case 'date':
          operatorObject = this.dateOperatorOptions
          break
        case 'checkbox':
          operatorObject = this.checkboxOperatorOptions
          break
        case 'lookup':
          operatorObject = this.lookupOperatorOptions
          break
        case 'richtext':
          operatorObject = this.stringOperatorOptions
          break
      }
      for (const key in operatorObject) {
        stringFilterList.push({
          value: operatorObject[key],
          text: key,
        })
      }
      return stringFilterList
    },
    fieldsList() {
      const fieldsList = []
      for (const fieldName in this.fields) {
        const { caption } = this.fields[fieldName] || {}
        fieldsList.push({
          text: caption,
          value: fieldName,
        })
      }
      return fieldsList
    },
    fieldDetails() {
      return this.fields[this.filterRule.field] || {}
    },
  },
  methods: {
    onCalendarChange(value) {
      this.setInputValue(value)
    },
    onFilterInput() {
      this.setInputValue(this.textFieldInput)
    },
    setInputValue(value) {
      if (value) {
        this.filterRule.value = value
      }
    },
    deleteFieldFilter(filterValue) {
      const { fieldName } = this
      const fieldFilterValues = this.filterFields[fieldName]
      fieldFilterValues.delete(filterValue)
      this.filterFields[fieldName] = new Set(fieldFilterValues)
      this.$emit('deleteFieldFilter', fieldName, this.values)
    },
    onRuleConditionChange() {
      this.$emit('onRuleConditionChange', this.selectedConditionOperator)
    },
    onFieldChange() {
      this.filterRule.value = ''
    },
    translate(fieldsList) {
      const fieldsListObj = []
      fieldsList.map((e) => {
        e.text = this.$t(e.text)
        fieldsListObj.push(e)
      })
      return fieldsListObj
    },
    tanslateStringFilter(stringFilterOptions) {
      const stringFilterOptionsObj = []
      stringFilterOptions.map((e) => {
        e.text = this.$t(e.text)
        stringFilterOptionsObj.push(e)
      })
      return stringFilterOptionsObj
    },
  },
}
</script>

<style scoped>
.filter-field {
  max-width: 170px;
  min-width: 170px;
}
.filter-or {
  max-width: 90px;
  min-width: 90px;
}
@media (max-width: 600px) {
  .filter-or,
  .filter-field,
  .filter-value {
    max-width: 75vw;
    min-width: 65vw;
    width: 100%;
  }
}
</style>
