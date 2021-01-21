<template>
  <div v-if="item.createdDate" class="mxcol-name d-block text-truncate">
    {{ $d(new Date(item.createdDate), 'long', $i18n.locale) }}
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
  },
}
</script>
