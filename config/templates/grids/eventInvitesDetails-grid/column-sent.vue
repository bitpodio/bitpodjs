<template>
  <div>
    <div v-if="item.Sent === true">
      <v-icon class="success--text fs-18">fa-mail</v-icon>
    </div>
    <div v-else>
      <v-icon class="success--text fs-18">fa-mail</v-icon>
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
