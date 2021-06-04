<template>
  <v-app id="inspire">
    <v-main class="esign-background">
      <v-container fluid class="pt-0">
        <v-row>
          <v-col class="pa-0">
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
  layout: 'public',
}
</script>

<style>
.esign-background {
  background-color: #e5e5e5;
}
</style>
