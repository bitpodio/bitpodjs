<template>
  <tr>
    <div class="positionAbsolute align-checkbox">
      <v-simple-checkbox
        :value="isSelected"
        @input="select($event)"
      ></v-simple-checkbox>
    </div>
    <td class="pb-4 pt-10">
      <div class="d-flex align-center">
        <v-avatar color="primary" size="48" class="mx-2">
          <span class="white--text Twitter">{{ item.FullName }}</span>
        </v-avatar>
        <div>
          <ColumnRegistrationFullname
            :item="item"
            :context="context"
            :value="item.FullName"
            class="text-body-1"
          />
          <ColumnStatus :value="item.Status" />
        </div>
      </div>
    </td>
    <td class="pb-4 pt-10">
      <ColumnCheckin
        v-if="!item.CheckIn"
        :item="item"
        :context="context"
        :refresh="refresh"
      />
      <ColumnAction v-else :item="item" :refresh="refresh" />
    </td>
  </tr>
</template>

<script>
import ColumnAction from './column-action.vue'
import ColumnCheckin from './column-checkin.vue'
import ColumnRegistrationFullname from './column-registration.fullname.vue'
import ColumnStatus from './column-status.vue'
export default {
  components: {
    ColumnRegistrationFullname,
    ColumnStatus,
    ColumnCheckin,
    ColumnAction,
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
</style>
