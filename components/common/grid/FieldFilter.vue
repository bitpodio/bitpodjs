<template>
  <div>
    <div>{{ fieldCaption }}</div>
    <!-- <div v-if="fieldType === 'date'">
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
        v-model="textFieldInput"
        label="Enter a value"
        type="number"
        @keyup.enter="onFilterInput"
      ></v-text-field>
    </div>
    <div v-else>
      <v-text-field
        v-model="textFieldInput"
        label="Enter a value"
        type="text"
        @keyup.enter="onFilterInput"
      ></v-text-field>
    </div> -->

    <!-- <div v-for="filterValue in filterValues" :key="filterValue">
      <span>{{ filterValue }}</span>
      <span @click="deleteFieldFilter(filterValue)"
        ><v-icon right>mdi-close</v-icon></span
      >
    </div> -->
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
              label="Enter Date"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="filterRule.value"
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
</template>

<script>
export default {
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
      date: new Date().toISOString().substr(0, 10),
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
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      conditionOperator: ['and', 'or'],
      selectedConditionOperator: 'and',
    }
  },
  computed: {
    fieldCaption() {
      //   const  = this.fields[this.fieldName] || {}
      return ''
    },
    fieldType() {
      const { type } = this.fields[this.filterRule.field] || {}
      return type
    },
    stringFilterOptions() {
      const stringFilterList = []
      for (const key in this.stringOperatorOptions) {
        stringFilterList.push({
          value: this.stringOperatorOptions[key],
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
  watch: {
    filterValues(newVal, oldVal) {
      // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    },
  },
  methods: {
    onCalendarChange(value) {
      //   const { fieldName } = this
      this.setInputValue(value)
      //   this.date = new Date().toISOString().substr(0, 10)
    },
    onFilterInput() {
      this.setInputValue(this.textFieldInput)
    },
    setInputValue(value) {
      if (value) {
        // const fieldFilterValues = this.values
        // fieldFilterValues.add(value)
        // this.values = new Set(fieldFilterValues)
        // this.$emit('setFieldValues', this.fieldName, this.values)
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
