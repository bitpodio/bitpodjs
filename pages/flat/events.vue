<template>
  <v-layout column xs12 sm8 md8 lg8>
    <v-flex xs12 sm8 md8 lg8 white pa-4 mr-2 mb-2>
      <h1>Event Name Here</h1>
      <v-chip class="my-2" label>
        Aug 20, 2020 5:36 PM - Aug 24, 2020 5:36 PM
      </v-chip>
      <v-flex my-3>
        <div class="dashboard-tile">
          <div class="dashboard-icon success">
            <i class="fa fa-user-check" aria-hidden="true"></i>
          </div>
          <div class="dashboard-info grey lighten-4">
            <div class="dashboard-value">
              1
            </div>
            <div class="dashboard-label">Total Registration</div>
          </div>
        </div>
        <div class="dashboard-tile">
          <div class="dashboard-icon error">
            <i class="fa fa-user-x" aria-hidden="true"></i>
          </div>
          <div class="dashboard-info grey lighten-4">
            <div class="dashboard-value">
              1
            </div>
            <div class="dashboard-label">Abandoned Registration</div>
          </div>
        </div>
        <div class="dashboard-tile">
          <div class="dashboard-icon warning">
            <i class="fa fa fa-banknote" aria-hidden="true"></i>
          </div>
          <div class="dashboard-info grey lighten-4">
            <div class="dashboard-value">
              $ 3.00
            </div>
            <div class="dashboard-label">Revenue</div>
          </div>
        </div>
        <div class="dashboard-tile">
          <div class="dashboard-icon primary">
            <i class="fa fa-calendar2" aria-hidden="true"></i>
          </div>
          <div class="dashboard-info grey lighten-4">
            <div class="dashboard-value">
              29 Days
            </div>
            <div class="dashboard-label">Opens in</div>
          </div>
        </div>
      </v-flex>
      <v-flex>
        <p class="blue--text">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <a class="blue--text"
            >gf, Indira Gandhi International Airport New Delhi Delhi India
            110037</a
          >
        </p>
      </v-flex>
      <v-stepper alt-labels class="elevation-0" style="max-width: 800px;">
        <v-stepper-header>
          <v-stepper-step step="3" complete>Not Ready</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4" complete class="text-center align-center"
            >Open for regsitarion</v-stepper-step
          >

          <v-divider></v-divider>

          <v-stepper-step step="4" complete>Sold out</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="" class="text-center align-center"
            >Registarion Closed</v-stepper-step
          >
        </v-stepper-header>
      </v-stepper>

      <v-divider></v-divider>
      <v-flex class="d-flex flex-row align-center">
        <v-avatar color="warning" size="24" class="d-inline-flex">
          <span class="white--text caption">M</span>
        </v-avatar>
        <v-subheader class="d-inline-flex pl-1"
          ><span>Created this event 1 day ago.</span></v-subheader
        >
      </v-flex>
    </v-flex>
    <v-flex xs12 sm4 md4 lg4 white pa-4 mr-2 mb-2>
      <h2 class="section-title">Attendees</h2>
      <v-divider></v-divider>
      <Grid :content="content.EventsManagement" view-name="All Events" />
    </v-flex>
    <v-flex xs12 sm12 md12 white pa-4 mr-2 mb-2>
      <Grid :content="content.EventsManagement" view-name="All Events" />
    </v-flex>
  </v-layout>
</template>

<script>
import Grid from '~/components/common/grid'
import content from '~/config/apps/event/content'
export default {
  layout: 'flatlayout',
  components: {
    Grid,
  },
  data() {
    return {
      content,
    }
  },
  created() {},
}
</script>

<style scoped>
.dashboard-tile {
  display: inline-flex;
  flex-direction: row;
  min-width: 200px;
  max-width: 200px;
  height: 60px;
  border-radius: 12px;
  margin: 10px;
  margin-left: 0;
  margin-top: 0;
}
.dashboard-icon {
  color: #fff;
  display: inline-flex;
  align-items: center;
  border-radius: 4px 0 0 4px;
  width: 100px;
  max-width: 100px;
  box-sizing: border-box;
  justify-content: center;
}
.dashboard-info {
  width: 150px;
  background: #f2f2f2;
  background: #fff;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border-radius: 0 4px 4px 0;
}
.dashboard-icon .fa {
  font-size: 24px;
  color: #fff;
}
.dashboard-value {
  font-size: 20px;
  color: #333;
  min-height: 28px;
}
.dashboard-label {
  color: #666;
  font-size: 12px;
  max-width: 105px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 105px;
  white-space: nowrap;
  line-height: 12px;
}
.section-title {
  font-size: 18px;
  font-weight: 400;
}
</style>
