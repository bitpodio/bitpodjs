<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
      <v-row>
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
      <v-row>
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
      <v-row>
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
    </div>
    <!-- <div>
      <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      <GChart
        type="PieChart"
        :data="chartData1"
        :options="chartOptions1"
        style="width: 900px; height: 500px;"
      />
    </div> -->
  </div>
</template>
<script>
// import { GChart } from 'vue-google-charts'
export default {
  components: {
    // GChart,
  },
  data() {
    return {
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350],
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
      },
      chartData1: [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7],
      ],
      chartOptions1: {
        chart: {
          title: 'My Daily Activities',
          pieHole: 0.4,
        },
      },
      eventSummaryData: [
        {
          caption: 'Total Registrations',
          icon: 'mdi-account-check',
          data: '',
        },
        {
          caption: 'Abandoned Registrations',
          icon: 'mdi-account-remove',
          data: '',
        },
        {
          caption: 'Total Revenue',
          icon: 'mdi-cash-usd',
          data: '',
        },
        {
          caption: 'Tickets Sold',
          icon: 'mdi-ticket-confirmation',
          data: '',
        },
        {
          caption: 'Email Conversion',
          icon: 'mdi-account-convert',
          data: '',
        },
      ],
    }
  },
}
</script>
