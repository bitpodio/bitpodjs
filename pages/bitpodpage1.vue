<template>
  <div>
    <div>
      <v-container id="dropdown-example" class="pa-0">
        <v-row>
          <v-col class="d-flex top-head" cols="12" sm="6">
            <v-select
              :items="dropdown_list"
              label="Live and Draft Events"
              dense
              solo
              class="tophead-select"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <h1 class="title">
      Registarion Page Here
    </h1>

    <div class="d-flex">
      <v-card max-width="300" class="eventtiles">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Top 10 Australian beaches</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>
      </v-card>

      <v-card max-width="300" class="eventtiles">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Top 10 Australian beaches</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>
      </v-card>

      <v-card max-width="300" class="eventtiles">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Top 10 Australian beaches</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>
      </v-card>
    </div>

    <v-card max-width="300" class="eventtiles">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline"
            >Our Changing Planet</v-list-item-title
          >
          <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
        height="194"
      ></v-img>

      <v-card-text>
        Visit ten places on our planet that are undergoing the biggest changes
        today.
      </v-card-text>

      <v-card-actions>
        <v-btn text color="deep-purple accent-4">
          Read
        </v-btn>
        <v-btn text color="deep-purple accent-4">
          Bookmark
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'googlecontact',
  data: () => ({
    dropdown_list: ['Live and Draft Events', 'Past', 'All Events', 'Calendar'],
    dropdown_icon: [
      { text: 'list', callback: () => console.log('list') },
      { text: 'favorite', callback: () => console.log('favorite') },
      { text: 'delete', callback: () => console.log('delete') },
    ],
  }),
}
</script>

<style scoped>
.eventtiles {
  margin: 10px 10px 10px 0;
}
.top-head {
  max-width: 350px;
}
</style>
