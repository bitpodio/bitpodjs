<template>
  <v-list dense class="py-0">
    <v-list-item>
      <v-btn text small color="primary" :href="oldSite" target="_blank">
        <i18n path="Common.GoToOldSite" />
      </v-btn>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      oldSite: this.localePath(`/adm`),
    }
  },
}
</script>
