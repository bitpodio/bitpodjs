<template>
  <tr>
    <td>
      <div class="d-flex justify-end pt-4 pb-2">
        <v-simple-checkbox :value="isSelected" @input="select($event)">
        </v-simple-checkbox>
      </div>
      <div class="d-flex align-center pb-4">
        <v-avatar tile color="primary" size="56" class="mx-2">
          <span class="white--text Twitter">{{ item.FullName }}</span>
        </v-avatar>
        <div class="flex-grow-1">
          <p class="mb-1 fs-larger text-capitalize">{{ item.FullName }}</p>
          <ColumnStatus :value="item.Status" :outlined="true" :label="true" />
        </div>
        <div class="">
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
.align-checkbox {
  right: 18px;
  padding-top: 10px;
}
.fs-larger {
  font-size: 1.25rem;
}
</style>
