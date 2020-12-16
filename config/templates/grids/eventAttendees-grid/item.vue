<template>
  <tr>
    <td>
      <div class="d-flex align-center py-3 mx-n3">
        <v-simple-checkbox
          class="pr-3"
          :value="isSelected"
          @input="select($event)"
        >
        </v-simple-checkbox>
        <div class="flex-grow-1">
          <p class="mb-1 fs-larger text-capitalize">{{ item.FullName }}</p>
          <ColumnStatus :value="item.Status" :outlined="true" :label="true" />
        </div>
        <div class="min-w-checkin">
          <ColumnCheckin
            :item="item"
            :context="context"
            :refresh="refresh"
            :is-custom-mobile="true"
          />
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
import ColumnCheckin from './column-checkin.vue'
import ColumnStatus from './column-status.vue'
export default {
  components: {
    ColumnStatus,
    ColumnCheckin,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false,
    },
    context: {
      type: Object,
      default: () => {},
      required: false,
    },
    refresh: {
      type: Function,
      default: () => false,
      required: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
<style scoped>
.min-w-checkin {
  min-width: 88px;
}
.fs-larger {
  font-size: 1.25rem;
}
</style>
