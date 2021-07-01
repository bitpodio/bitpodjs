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
      debugger
      const strategy = this.$auth.$storage.getCookies()['auth.strategy']
      console.debug('userApps >> Startegy', strategy)
      const userInfo = userUtils.userCurrentOrgInfo(this.$store) || {}
      console.debug('userApps >> userInfo', userInfo)
      const userRoles = [
        ...(userInfo.roles || []),
        ...(this.$auth.$state.loggedIn ? ['$authenticated'] : []),
      ]
      console.debug('userApps >> userRoles', userRoles)
      if (
        userRoles.includes('$orgowner') &&
        userInfo &&
        userInfo.id === 1 &&
        strategy === 'bitpod'
      ) {
        console.debug('having orgowner access')
        console.debug('having userInfo.id is 1', userInfo.id)
        console.debug('having orgowner strategy bitpod', strategy)
        return this.apps
      }

      if (
        userRoles.includes('$orgowner') &&
        userInfo &&
        userInfo.id === 1 &&
        strategy === 'google'
      ) {
        console.debug('having orgowner access')
        console.debug('having userInfo.id is 1', userInfo.id)
        console.debug('having orgowner strategy google', strategy)
        const filterApps = this.apps.filter((app) => {
          return app.name !== 'userprofile'
        })
        console.debug('filterApps', filterApps)
        return filterApps
      }
      const filteredApps = this.apps.filter((app) => {
        const appRoles = [app.name, ...app.roles]
        return intersection(appRoles, userRoles).length > 0
      })
      console.debug('before filterApps', filteredApps)
      if (filteredApps.length > 0 && strategy === 'bitpod') {
        console.debug('filteredApps length > 0', filteredApps)
        console.debug('strategy', strategy)
        return filteredApps
      } else {
        const filterApps = filteredApps.filter((app) => {
          return app.name !== 'userprofile'
        })
        console.debug('filterApps length ', filterApps)
        console.debug('strategy', strategy)
        return filterApps
      }
    },
  },
}
</script>
