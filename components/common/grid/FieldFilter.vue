<template>
  <div>
    <div class="d-flex align-center">
      <div v-if="index === 0">
        Where
      </div>
      <div v-else-if="index === 1">
        <v-select
          v-model="selectedConditionOperator"
          :items="conditionOperator"
          label="select"
          single-line
        ></v-select>
      </div>
      <div v-else>
        {{ selectedConditionOperator }}
      </div>
      <v-select
        v-model="filterRule.field"
        :items="fieldsList"
        item-text="text"
        item-value="value"
        label="Field"
        single-line
      ></v-select>
      <v-select
        v-model="filterRule.operator"
        :items="stringFilterOptions"
        item-text="text"
        item-value="value"
        label="Operator"
        single-line
      ></v-select>
      <div v-if="!nonInputOperators.includes(filterRule.operator)">
        <div v-if="fieldType === 'date'">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Enter Date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              show-current="true"
              @change="onCalendarChange"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div v-else-if="fieldType === 'number'">
          <v-text-field
            v-model="filterRule.value"
            label="Enter a value"
            type="number"
            @keyup.enter="onFilterInput"
          ></v-text-field>
        </div>
        <div v-else-if="fieldType === 'checkbox'">
          <v-checkbox v-model="filterRule.value"></v-checkbox>
        </div>
        <div v-else-if="fieldType === 'lookup'">
          <Lookup />
        </div>
        <div v-else>
          <v-text-field
            v-model="filterRule.value"
            label="Enter a value"
            type="text"
            @keyup.enter="onFilterInput"
          ></v-text-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lookup from '../lookup'
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
  },
  data() {
    return {
      dialog: false,
      menu2: false,
      date: this.filterRule.value || new Date().toISOString().substr(0, 10),
      textFieldInput: null,
      values: this.filterValues,
      stringOperatorOptions: {
        Is: 'is',
        'Is not': 'isNot',
        Contains: 'contains',
        'Does not contain': 'notContains',
        'Starts with': 'startsWith',
        'Ends with': 'endsWith',
        'Is empty': 'isEmpty',
        'Is not empty': 'isNotEmpty',
      },
      numberOperatorOptions: {
        '=': 'is',
        '≠': 'isNot',
        '>': 'gt',
        '<': 'lt',
        '≥': 'gte',
        '≤': 'lte',
        'Is empty': 'isEmpty',
        'Is not empty': 'isNotEmpty',
      },
      dateOperatorOptions: {
        Today: 'today',
        Tomorrow: 'tomorrow',
        Yesterday: 'yesterday',
        'The past week': 'pastWeek',
        'The past month': 'pastMonth',
        'The past year': 'pastYear',
        'The next week': 'nextWeek',
        'The next month': 'nextMonth',
        'The next year': 'nextYear',
        'Exact date': 'exactDate',
        'Is empty': 'isEmpty',
        'Is not empty': 'isNotEmpty',
      },
      checkboxOperatorOptions: {
        Is: 'is',
        'Is not': 'isNot',
      },
      lookupOperatorOptions: {
        Is: 'is',
        'Is not': 'isNot',
        'Is empty': 'isEmpty',
        'Is not empty': 'isNotEmpty',
      },
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      conditionOperator: ['and', 'or'],
      selectedConditionOperator: 'and',
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
  },
}
</script>
