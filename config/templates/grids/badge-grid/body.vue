<template>
  <v-flex class="d-flex flex-wrap greybg pa-0 justify-center justify-md-start">
    <v-hover
      v-for="item in items"
      :key="item.id"
      v-slot:default="{ hover }"
      open-delay="200"
    >
      <v-card :elevation="hover ? 1 : 0" class="ma-3 ml-0 mt-0">
        <div v-html="item.Template" />
      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
export default {
  props: ['items'],
}
</script>

<style scoped>
.invite-card {
  width: 220px;
  max-width: 220px;
}
</style>
