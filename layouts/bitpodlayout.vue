<template>
  <div class="dark">
    <BitpodHeader />
    <div class="page-content">
      <BitpodSidebar />
    </div>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-tooltip right>
            <div class="page-right"><Nuxt /></div>
          </v-tooltip>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
