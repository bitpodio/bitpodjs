export const formFieldMixin = {
  computed: {
    fieldCaption() {
      const field = this.field
      const fieldCaption = field.form && field.form.caption
      return fieldCaption || field.caption
    },
  },
}
