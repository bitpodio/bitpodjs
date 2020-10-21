<template>
  <div>
    <div v-if="item.Unsubscribed === true">
      <v-icon class="error--text fs-18">fa-sad</v-icon>
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
