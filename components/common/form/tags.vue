<template>
  <div>
    <v-combobox
      v-model="select"
      :label="fieldCaption"
      :rules="rules"
      :readonly="readonly"
      outlined
      dense
      multiple
      append-icon
      chips
      small-chips
      deletable-chips
      class="tag-input"
      :search-input.sync="search"
      @keyup.tab="updateTags"
      @paste="updateTags"
      @change="onTagsChange"
    >
    </v-combobox>
  </div>
</template>

<script>
import { formFieldMixin } from '~/utility/form-control'
export default {
  mixins: [formFieldMixin],
  props: {
    value: {
      type: null,
      default: null,
    },
    field: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      select: this.value || [],
      search: '',
    }
  },
  methods: {
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    onTagsChange() {
      this.$emit('input', this.select)
      this.onChange && this.onChange(this.select)
    },
  },
}
</script>
