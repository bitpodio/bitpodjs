<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click.stop="onDelete">
      <v-icon left class="fs-16">fa-trash</v-icon>
      {{ $t(actionCaption('delete')) }}
    </v-btn>
    <confirm ref="confirm"></confirm>
  </v-col>
</template>

<script>
import { gridActionMixin, formTitleMixin } from '~/utility/form'

export default {
  mixins: [formTitleMixin, gridActionMixin],
  props: {
    content: {
      type: null,
      default: null,
    },
    viewName: {
      type: String,
      required: true,
    },
    items: { type: Array, default: () => [] },
    onDeleteItem: { type: Function, default: () => {} },
    context: {
      type: null,
      default: null,
    },
  },
  data() {
    return {
      dialog: false,
      updateCount: 0,
    }
  },
  methods: {
    async onDelete() {
      const ids = this.items.map(({ id }) => id)
      const subhead = this.subTitle.toLowerCase()
      const res = await this.$refs.confirm.open(
        this.$tc('Common.DeleteDefaultForm', ids.length, {
          subTitle: subhead,
        }),
        this.$tc('Messages.Warn.DeleteWarning', ids.length, {
          subTitle: subhead,
        }),
        { color: 'error lighten-1' }
      )
      if (res) {
        const ids = this.items.map(({ id }) => id)
        await this.onDeleteItem(ids)
      }
    },
  },
}
</script>
