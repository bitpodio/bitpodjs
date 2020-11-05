<template>
  <v-col class="px-0">
    <v-btn text small v-bind="attrs" v-on="on" @click="onDelete">
      <v-icon left class="fs-16">fa-trash</v-icon>
      <span v-if="gridDeleteAction === 'Delete'">{{
        $t('Drawer.Delete')
      }}</span>
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
      gridDeleteAction: this.actionCaption('delete'),
    }
  },
  methods: {
    async onDelete() {
      const ids = this.items.map(({ id }) => id)
      const res = await this.$refs.confirm.open(
        this.$tc('Common.DeleteDefaultForm', ids.length, {
          subTitle: this.subTitle,
        }),
        this.$tc('Messages.Warn.DeleteWarning', ids.length, {
          subTitle: this.subTitle,
        }),
        { color: 'error' }
      )
      if (res) {
        const ids = this.items.map(({ id }) => id)
        await this.onDeleteItem(ids)
      }
    },
  },
}
</script>
