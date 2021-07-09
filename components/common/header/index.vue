<template>
  <v-app-bar app flat class="greybg headernew pl-0" height="50">
    <v-toolbar-title
      class="ml-n3 pl-0 px-2 py-1 logo-ds d-flex align-center appbar-left"
    >
      <AppLogo />
      <v-spacer></v-spacer>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
import AppLogo from '~/components/common/app-logo'
export default {
  layout: 'logoutlayout',
  components: {
    AppLogo,
  },
}
</script>
