<template>
  <v-col class="px-0">
    <v-card>
      <v-card-title
        class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
      >
        <h2 class="black--text pt-5 pb-3 text-h5">Default Form</h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click.native="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    onClose: {
      required: true,
      type: Function,
    },
  },
}
</script>
