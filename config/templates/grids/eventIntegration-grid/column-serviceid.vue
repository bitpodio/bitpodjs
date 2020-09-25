<template>
  <div>
    <v-img
      :src="imageUrl"
      aspect-ratio="1"
      min-height="55"
      max-height="55"
      contain
    ></v-img>
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      imageUrl: this.item.MetaData.Image,
    }
  },
}
</script>
