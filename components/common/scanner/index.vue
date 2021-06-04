<template>
  <div class="d-flex flex-column justify-center d-sm-none">
    <div class="d-flex justify-center">
      <v-img
        :src="$config.cdnUri + 'sccan.png'"
        style="max-width: 30px;"
      ></v-img>
    </div>
    <div class="d-flex justify-center">
      <i18n path="Common.Scan" class="fs-14" />
    </div>
  </div>
</template>
