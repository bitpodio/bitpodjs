<template>
  <tr>
    <td class="py-2">
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
    <td class="py-2">
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
  },
  computed: {
    route() {
      const regId = this.item.registration
        ? atob(this.item.registration.id).split(':')[1]
        : ''
      return `/apps/event${this.context.basePath}/${regId}`
    },
  },
}
</script>

<style scoped></style>
