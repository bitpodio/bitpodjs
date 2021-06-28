<template>
  <v-app-bar app flat class="greybg headernew pl-0" height="50">
    <v-toolbar-title
      class="ml-n3 pl-0 px-2 py-1 logo-ds d-flex align-center appbar-left"
    >
      <span v-if="!$vuetify.theme.dark" class="bitpod-logo logo-ds px-3">
        <a>
          <v-img
            :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
            class="logofull mr-2"
          ></v-img>
        </a>
      </span>
      <span v-if="$vuetify.theme.dark" class="bitpod-logo logo-ds px-3">
        <a>
          <v-img
            :src="$config.cdnUri + 'bitpod-logo-white.svg'"
            class="logofull mr-2"
          ></v-img>
        </a>
      </span>
      <v-spacer></v-spacer>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
