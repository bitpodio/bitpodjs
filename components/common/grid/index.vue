<template>
  <div>
    <Observer
      :data-test-id="viewName"
      :height="height"
      @intersect="intersected"
    />
    <Grid
      v-if="shouldRender"
      :view-name="viewName"
      :search="search"
      :filter="filter"
      :content="content"
      :context="context"
      :value="value"
      :single-select="singleSelect"
      :no-action="noAction"
      :server-items-length="serverItemsLength"
      :has-mobile-custom-view="hasMobileCustomView"
      :has-custom-no-data-text="hasCustomNoDataText"
      :custom-base-action-count="customBaseActionCount"
    >
      <template #filter> <slot name="filter" /> </template>
      <template #search>
        <slot name="search" />
      </template>
      <template #gridthreedot>
        <slot name="gridthreedot" />
      </template>
    </Grid>
    <v-skeleton-loader
      v-if="
        !(
          viewName === 'live-and-draft-event' ||
          viewName === 'template' ||
          viewName === 'seatmaps' ||
          viewName === 'badge' ||
          viewName === 'integration' ||
          viewName === 'eSign' ||
          viewName === 'eSignCompleted' ||
          viewName === 'eSignInprogress' ||
          viewName === 'eSignDeclined' ||
          viewName === 'feeds' ||
          viewName === 'Members' ||
          viewName === 'integration' ||
          viewName === 'printed-tickets'
        ) && !shouldRender
      "
      :loading="!shouldRender"
      :class="{
        'mt-16 mt-sm-14': this.hasCustomNoDataText && noAction,
      }"
      type="table"
      :min-width="minWidth"
      :max-width="maxWidth"
      :width="width"
      :height="height"
    >
      <div></div>
    </v-skeleton-loader>
    <div
      v-if="viewName === 'live-and-draft-event' && !shouldRender"
      class="d-flex flex-sm-wrap flex-column flex-sm-row"
    >
      <v-skeleton-loader
        v-for="i in 10"
        :key="i"
        :loading="!!loading"
        type="card"
        width="264"
        class="pa-4 pl-0 pt-0 eventtiles ma-sm-4 ml-sm-0 mt-sm-0 mx-auto my-2"
      >
        <div></div>
      </v-skeleton-loader>
    </div>
    <div
      v-if="viewName === 'template' && !shouldRender"
      class="d-flex flex-sm-wrap flex-column flex-sm-row mt-12 pt-12"
    >
      <v-skeleton-loader
        v-for="i in 10"
        :key="i"
        :loading="!!loading"
        type="card"
        width="236"
        class="pa-4 pl-0 pt-0 eventtiles ma-4 ml-0 mt-0"
      >
        <div></div>
      </v-skeleton-loader>
    </div>
    <div
      v-if="viewName === 'printed-tickets' && !shouldRender"
      class="d-flex flex-sm-wrap flex-column flex-sm-row mt-12"
    >
      <v-skeleton-loader
        v-for="i in 6"
        :key="i"
        :loading="!!loading"
        type="card"
        width="425"
        class="pa-4 pl-0 pt-0 eventtiles ma-4 ml-0 mt-0"
      >
        <div></div>
      </v-skeleton-loader>
    </div>
    <div
      v-if="viewName === 'badge' && !shouldRender"
      class="d-flex flex-sm-wrap flex-column flex-sm-row"
    >
      <div class="public-page-main d-flex flex-wrap flex-row mt-11">
        <div
          v-for="i in 10"
          :key="i"
          class="pa-0 eventtiles badge-tile boxview ma-3 ml-0 mt-0 v-card elevation-0"
        >
          <v-skeleton-loader
            :loading="loading"
            :tile="true"
            type="avatar"
            class="ml-3 mt-2"
            width="150"
            height="30"
          >
            <div class="ml-3 mt-2"></div>
          </v-skeleton-loader>
          <v-skeleton-loader
            :loading="loading"
            :tile="true"
            type="avatar"
            class="mt-10 ml-4"
            width="180"
            height="30"
          >
            <div class="mt-10 ml-4"></div>
          </v-skeleton-loader>
          <v-skeleton-loader
            :loading="loading"
            :tile="true"
            type="avatar"
            class="mt-10 ml-4"
            width="180"
            height="40"
          >
            <div class="mt-10 ml-4"></div>
          </v-skeleton-loader>
          <v-skeleton-loader
            :loading="loading"
            :tile="true"
            type="avatar"
            class="ml-4 mt-10"
            width="200"
            height="20"
          >
            <div class="ml-4 mt-10"></div>
          </v-skeleton-loader>
        </div>
      </div>
    </div>
    <div
      v-if="viewName === 'seatmaps' && !shouldRender"
      class="d-flex flex-wrap flex-row seat-skeleton-inner mt-10 pl-2"
    >
      <v-skeleton-loader
        v-for="i in 10"
        :key="i"
        :loading="loading"
        type="card"
        width="155"
        height="125"
        class="pl-0 pt-0 eventtiles ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0"
      >
        <div></div>
      </v-skeleton-loader>
    </div>
    <div
      v-if="viewName === 'integration' && !shouldRender"
      class="d-flex flex-wrap flex-row seat-skeleton-inner mt-16 pl-2"
    >
      <v-skeleton-loader
        v-for="i in 10"
        :key="i"
        :loading="loading"
        type="card"
        width="150"
        height="125"
        class="pl-0 pt-0 eventtiles ma-3 ma-md-10 ml-0 mt-0 ml-md-0 mt-md-0"
      >
        <div></div>
      </v-skeleton-loader>
    </div>
    <div
      v-if="viewName === 'Members' && !shouldRender"
      class="d-flex flex-sm-wrap flex-column flex-sm-row"
    >
      <v-skeleton-loader
        v-for="i in 10"
        :key="i"
        :loading="!!loading"
        type="card"
        width="230"
        height="230"
        class="text-center mx-auto ma-sm-8 ml-sm-0 mt-sm-0 member-tile elevation-0"
      >
        <div></div>
      </v-skeleton-loader>
    </div>
    <div
      v-if="
        (viewName === 'eSign' ||
          viewName === 'eSignCompleted' ||
          viewName === 'eSignInprogress' ||
          viewName === 'eSignDeclined') &&
        !shouldRender
      "
      class="d-flex flex-sm-wrap flex-column mx-auto"
    >
      <div class="pt-10 pb-10">
        <v-skeleton-loader type="heading"></v-skeleton-loader>
      </div>
      <div class="d-flex flex-wrap">
        <v-skeleton-loader type="heading" class="pb-10"></v-skeleton-loader>
        <v-skeleton-loader
          v-for="i in 10"
          :key="i"
          :loading="!!loading"
          type="card"
          width="230"
          class="text-center mx-auto ma-sm-8 ml-sm-0 mt-sm-0 member-tile elevation-0"
        >
          <div></div>
        </v-skeleton-loader>
      </div>
      <div v-if="viewName === 'feeds' && !shouldRender" class="d-flex">
        <v-row class="flex-column">
          <v-col
            v-for="i in 3"
            :key="i"
            cols="12"
            md="6"
            class="col-md-6 feed-section-load mx-auto px-0"
          >
            <v-skeleton-loader
              v-bind="attrs"
              :loading="!!loading"
              type="list-item-avatar-three-line, image, article"
              ><div></div
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from './core-grid'
import Observer from './observer'

export default {
  components: {
    Grid,
    Observer,
  },
  props: {
    maxWidth: {
      default: undefined,
      type: [Number, String],
    },
    minWidth: {
      default: undefined,
      type: [Number, String],
    },
    height: {
      default: '400px',
      type: String,
    },
    width: {
      default: undefined,
      type: [Number, String],
    },
    viewName: {
      type: String,
      required: true,
    },
    search: {
      type: String,
      default: '',
    },
    filter: {
      type: Object,
      default: () => null,
    },
    content: {
      type: Object,
      required: true,
    },
    context: {
      type: Object,
      required: false,
      default: () => {},
    },
    value: {
      type: Array,
      default: () => [],
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    noAction: {
      type: Boolean,
      default: false,
    },
    serveritemslength: {
      type: null,
      default: null,
    },
    onlySticky: {
      type: Boolean,
      default: false,
    },
    hasMobileCustomView: {
      type: Boolean,
      default: false,
    },
    hasCustomNoDataText: {
      type: String,
      default: '',
    },
    customBaseActionCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return { shouldRender: false }
  },
  methods: {
    intersected() {
      this.shouldRender = true
    },
  },
}
</script>
