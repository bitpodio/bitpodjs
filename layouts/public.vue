<template>
  <v-app id="inspire">
    <v-main class="greybg">
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
