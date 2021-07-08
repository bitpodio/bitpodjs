<template>
  <v-app id="inspire">
    <v-app-bar app flat color="white">
      <AppLogo />
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
import AppLogo from '~/components/common/app-logo'
export default {
  layout: 'logoutlayout',
  components: {
    AppLogo,
  },
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
