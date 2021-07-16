<template>
  <div>
    <v-list dense class="py-0 ml-n4">
      <v-list-item>
        <v-btn text small color="primary" @click="onUserSettings">
          <i18n path="Common.UserProfileApp" />
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  methods: {
    onUserSettings() {
      const baseUrl = window.location.href.split('/apps')[0]
      if (process.client) {
        if (!baseUrl.includes('localhost')) {
          const url = `https://${baseUrl}/apps/userprofile/user-profile`
          window.open(`${url}`, '_blank')
        } else {
          const url = `http://${window.location.host}/apps/userprofile/user-profile`
          window.open(`${url}`, '_blank')
        }
      }
    },
  },
}
</script>
