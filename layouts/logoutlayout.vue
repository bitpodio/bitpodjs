<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="bitpod-logo logo-ds">
        <v-img
          :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
          class="logo-full"
        ></v-img>
      </span>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn class="ma-2" outlined color="primary" to="/login">
        Sign in
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <div>
              <nuxt />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'logoutlayout',
}
</script>

<style scoped>
.logo-full {
  max-width: 110px !important;
}
</style>
