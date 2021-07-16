<template>
  <v-menu
    offset-y
    transition="slide-y-transition"
    bottom
    content-class="app-drawer"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title class="d-flex flex-wrap app-container">
          <div v-for="app in userApps" :key="app.name">
            <nuxt-link
              v-if="app.route"
              :to="localePath(app.route)"
              class="text-decoration-none"
              target="_blank"
            >
              <v-flex
                class="d-flex justify-center align-center flex-column app-view"
              >
                <v-flex class="d-flex justify-center align-center">
                  <i :class="app.css" aria-hidden="true"></i>
                </v-flex>
                <v-flex
                  ><div class="pa-1 caption text--primary">
                    {{ $t(app.label) }}
                  </div></v-flex
                >
              </v-flex>
            </nuxt-link>
            <a
              v-if="app.href"
              :href="app.href"
              class="text-decoration-none"
              target="_blank"
            >
              <v-flex
                class="d-flex justify-center align-center flex-column app-view"
              >
                <v-flex class="d-flex justify-center align-center">
                  <i :class="app.css" aria-hidden="true"></i>
                </v-flex>
                <v-flex
                  ><div class="pa-1 caption text--primary">
                    {{ $t(app.label) }}
                  </div></v-flex
                >
              </v-flex>
            </a>
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { intersection } from '~/utility/object.js'
import { appList } from '~/config/apps/list'
import userUtils from '~/utility/userApps'
export default {
  data() {
    return {
      apps: appList(this.$store),
    }
  },
  computed: {
    userApps() {
      const allApps = this.apps.filter((ele) => ele.name !== 'userprofile')
      const strategy = this.$auth.$storage.getCookies()['auth.strategy']
      const userInfo = userUtils.userCurrentOrgInfo(this.$store) || {}
      const userRoles = [
        ...(userInfo.roles || []),
        ...(this.$auth.$state.loggedIn ? ['$authenticated'] : []),
      ]
      if (
        userRoles.includes('$orgowner') &&
        userInfo &&
        userInfo.id === 1 &&
        strategy === 'bitpod'
      ) {
        return allApps
      }

      if (
        userRoles.includes('$orgowner') &&
        userInfo &&
        userInfo.id === 1 &&
        strategy === 'google'
      ) {
        const filterApps = allApps.filter((app) => {
          return app.name !== 'userprofile'
        })
        return filterApps
      }
      const filteredApps = allApps.filter((app) => {
        const appRoles = [app.name, ...app.roles]
        return intersection(appRoles, userRoles).length > 0
      })
      if (filteredApps.length > 0 && strategy === 'bitpod') {
        return filteredApps
      } else {
        const filterApps = filteredApps.filter((app) => {
          return app.name !== 'userprofile'
        })
        return filterApps
      }
    },
  },
}
</script>
