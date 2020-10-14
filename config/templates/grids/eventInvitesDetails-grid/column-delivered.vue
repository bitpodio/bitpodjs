<template>
  <div>
    <div v-if="item.Delivered === true">
      <v-icon class="success--text fs-18">fa-paperplane</v-icon>
    </div>
    <div v-else>
      <v-icon></v-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: String, default: '' },
  },
}
</script>
