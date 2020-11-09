<template>
  <v-app id="inspire">
    <v-app-bar app flat color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="bitpod-logo logo-ds">
        <v-img
          :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
          class="logo-full"
        ></v-img>
      </span>
      <v-spacer></v-spacer>
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
@media screen and (max-width: 600px) {
  .login-box {
    min-width: fit-content !important;
  }
}
</style>
