<template>
  <div>
    <div>{{ fieldCaption }}</div>
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
    </div>

    <div v-for="filterValue in filterValues" :key="filterValue">
      <span>{{ filterValue }}</span>
      <span @click="deleteFieldFilter(filterValue)"
        ><v-icon right>mdi-close</v-icon></span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterValues: {
      type: Set,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    fields: {
      type: Object,
      required: true,
    },
    filterFields: {
      type: Object,
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
    }
  },
  computed: {
    fieldCaption() {
      const { caption } = this.fields[this.fieldName] || {}
      return caption
    },
    fieldType() {
      const { type } = this.fields[this.fieldName] || {}
      return type
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
      debugger
      //   const { fieldName } = this
      this.setInputValue(value)
      this.date = new Date().toISOString().substr(0, 10)
    },
    onFilterInput() {
      debugger
      this.setInputValue(this.textFieldInput)
      this.textFieldInput = null
    },
    setInputValue(value) {
      if (value) {
        const fieldFilterValues = this.values
        fieldFilterValues.add(value)
        this.values = new Set(fieldFilterValues)
        this.$emit('setFieldValues', this.fieldName, this.values)
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
