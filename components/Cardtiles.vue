<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column my-2>
    <div class="align-center d-flex flex-row rounded event-tile mr-2 mb-2">
      <div
        class="pa-2 success d-flex justify-center align-center event-tile-left"
      >
        <i class="fa fa-user-check" aria-hidden="true"></i>
      </div>
      <div class="d-flex flex-column pa-2 event-tile-right greybg">
        <div class="event-tile-value text-truncate">1</div>
        <div class="caption text-truncate">Total Registration</div>
      </div>
    </div>

    <div class="align-center d-flex flex-row rounded event-tile mr-2 mb-2">
      <div
        class="pa-2 error d-flex justify-center align-center event-tile-left"
      >
        <i class="fa fa-user-x" aria-hidden="true"></i>
      </div>
      <div class="d-flex flex-column pa-2 event-tile-right greybg">
        <div class="event-tile-value text-truncate">1</div>
        <div class="caption text-truncate">Abandoned Registration</div>
      </div>
    </div>

    <div class="align-center d-flex flex-row rounded event-tile mr-2 mb-2">
      <div
        class="pa-2 warning d-flex justify-center align-center event-tile-left"
      >
        <i class="fa fa fa-banknote" aria-hidden="true"></i>
      </div>
      <div class="d-flex flex-column pa-2 event-tile-right greybg">
        <div class="event-tile-value text-truncate">$ 3.00</div>
        <div class="caption text-truncate">Revenue</div>
      </div>
    </div>

    <div class="align-center d-flex flex-row rounded event-tile mr-2 mb-2">
      <div
        class="pa-2 primary d-flex justify-center align-center event-tile-left"
      >
        <i class="fa fa-calendar2" aria-hidden="true"></i>
      </div>
      <div class="d-flex flex-column pa-2 event-tile-right greybg">
        <div class="event-tile-value text-truncate">10 Days</div>
        <div class="caption text-truncate">Opens in</div>
      </div>
    </div>
  </v-flex>
</template>

<style scoped>
.event-tile {
  height: 60px;
  max-width: 200px;
  min-width: 200px;
}
.event-tile-left {
  width: 75px;
  min-width: 75px;
  height: 60px;
  border-radius: 4px 0 0 4px;
}
.event-tile-left .fa {
  font-size: 24px;
  color: #fff;
}
.event-tile-right {
  height: 60px;
  min-width: 125px;
  border-radius: 0 4px 4px 0;
}
.event-tile-value {
  font-size: 20px;
}
</style>
