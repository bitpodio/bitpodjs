<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :class="{
        'custom-nav-drawer': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
      app
      class="nav-bar greybg"
      :width="240"
      :right="$vuetify.rtl"
    >
      <div class="px-4 pt-3 pb-1">
        <i18n path="Common.AppTitle" class="app-title-text text--primary" />
      </div>
      <div class="d-block d-sm-none my-3">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              small
              color="primary"
              depressed
              :disabled="allowUser"
              class="mx-3 wd-full"
              v-on="on"
            >
              <i18n path="Drawer.CreateEventAction" />
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item
              @click="
                triggerReset = !triggerReset
                dialog1 = !dialog1
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="fs-16 mr-2">fa-calendar</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><i18n path="Drawer.SingleEventAction"
                /></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="
                triggerRecEventReset = !triggerRecEventReset
                dialog = !dialog
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="fs-16 mr-2">fa-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><i18n path="Drawer.RecurringEventAction"
                /></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-list shaped>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <div class="pa-0 pl-5">
              <v-subheader v-if="item.heading" class="nav-subheader pl-2">
                <i18n v-if="item.heading === 'Event'" path="Common.EventApp" />
                <i18n
                  v-if="item.heading === 'Promotions'"
                  path="Common.Promotions"
                />
                <i18n v-if="item.heading === 'Members'" path="Common.Members" />
              </v-subheader>
            </div>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="nav-title">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="localePath(item.to)"
              router
              exact
            >
              <v-list-item-action v-if="child.icon" class="nav-icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="localePath(item.to)"
            router
            exact
            :class="matchRoute(item.to)"
          >
            <v-list-item-action class="nav-icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                v-if="item.text === 'Eventboard'"
                id="v-step-1"
                class="nav-title"
                ><i18n path="Drawer.Eventboard" />
              </v-list-item-title>
              <v-list-item-title
                v-if="item.text === 'Events'"
                id="v-step-2"
                class="nav-title"
                ><i18n path="Drawer.Events" />
              </v-list-item-title>
              <v-list-item-title
                v-if="item.text === 'Registrations'"
                id="v-step-3"
                ><i18n path="Drawer.Registrations"
              /></v-list-item-title>
              <v-list-item-title
                v-if="item.text === 'Discount Code'"
                id="v-step-5"
                ><i18n path="Drawer.DiscountCode"
              /></v-list-item-title>
              <v-list-item-title v-if="item.text === 'Members'"
                ><i18n path="Drawer.Members"
              /></v-list-item-title>
              <v-list-item-title v-if="item.text === 'Contacts'" id="v-step-4"
                ><i18n path="Drawer.Contacts"
              /></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <Help
        class="d-block d-sm-none mr-3"
        @clicked="
          () => {
            drawer = false
          }
        "
      />
    </v-navigation-drawer>

    <v-dialog
      v-model="dialog1"
      persistent
      scrollable
      content-class="slide-form"
    >
      <NewSingleEvent
        v-if="dialog1"
        :reset-data="triggerReset"
        :on-form-close="closeSingleEventForm"
      />
    </v-dialog>

    <v-dialog v-model="dialog" persistent scrollable content-class="slide-form">
      <NewRecurringEvent
        v-if="dialog"
        :reset-data="triggerRecEventReset"
        :on-form-close="closeRecurringEventForm"
      />
    </v-dialog>

    <v-app-bar app flat class="greybg headernew pl-0" height="50">
      <v-toolbar-title
        class="ml-n3 pl-0 px-2 py-1 logo-ds d-flex align-center appbar-left"
      >
        <v-app-bar-nav-icon
          :ripple="false"
          size="24"
          height="36px"
          width="36px"
          class="ml-0 mr-0 d-lg-none"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <span v-if="!$vuetify.theme.dark" class="bitpod-logo logo-ds px-3">
          <a href="/admin/apps/event/eventboard">
            <v-img
              :src="$config.cdnUri + 'bitpod-logo-blk2.svg'"
              class="logofull mr-2"
            ></v-img
          ></a>
        </span>
        <span v-if="$vuetify.theme.dark" class="bitpod-logo logo-ds px-3">
          <a href="/admin/apps/event/eventboard">
            <v-img
              :src="$config.cdnUri + 'bitpod-logo-white.svg'"
              class="logofull mr-2"
            ></v-img>
          </a>
        </span>
        <v-spacer></v-spacer>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-flex">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="v-step-0"
              v-bind="attrs"
              small
              color="primary"
              depressed
              :disabled="allowUser"
              class="mx-3"
              v-on="on"
            >
              <i18n path="Drawer.CreateEventAction" />
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item
              @click="
                triggerReset = !triggerReset
                dialog1 = !dialog1
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="fs-16 mr-2">fa-calendar</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><i18n path="Drawer.SingleEventAction"
                /></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="
                triggerRecEventReset = !triggerRecEventReset
                dialog = !dialog
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="fs-16 mr-2">fa-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><i18n path="Drawer.RecurringEventAction"
                /></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <Help id="v-step-6" class="d-none d-sm-inline" />
      <LanguageSwitcher id="v-step-7" />
      <AppDrawer id="v-step-8" />
      <v-menu
        v-if="$route.path === localePath('/apps/event/eventboard')"
        v-model="menu"
        left
        :offset-y="offset"
        transition="slide-y-transition"
        content-class="overflowHidden mt-8"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="startTour">
            <v-list-item-content>
              <v-list-item-title>Start Tour</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <div v-if="$auth.$state.loggedIn" id="v-step-9" class="ml-3">
        <v-menu
          v-model="account"
          :close-on-content-click="false"
          :nudge-width="180"
          offset-y
          transition="slide-y-transition"
          bottom
        >
          <template
            v-if="$auth.$state.loggedIn"
            v-slot:activator="{ on, attrs }"
          >
            <v-btn
              fab
              depressed
              x-small
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="userPlan"
            >
              <span class="white--text fs-16">{{
                $auth.user.data.name && $auth.user.data.name[0]
              }}</span>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="48" class="mt-0">
                  <v-avatar color="primary" size="48" v-bind="attrs" v-on="on">
                    <span class="white--text headline">{{
                      $auth.user.data.name && $auth.user.data.name[0]
                    }}</span>
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content class="mxcol-200">
                  <v-list-item-title>{{
                    $auth.user.data.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $auth.user.data.email
                  }}</v-list-item-subtitle>
                  <div v-if="allowUpgrade">
                    <div class="d-inline-flex mxcol-200 mt-1 align-center">
                      <v-list-item-subtitle class="text-body-2">{{
                        userPlanData
                      }}</v-list-item-subtitle>
                      <Upgrade />
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list-item>
              <OrgnaizationList />
            </v-list-item>
            <OldSite />
            <Theme />
            <v-list dense class="pt-0">
              <v-list-item>
                <v-btn text small color="primary" @click="onLogout">
                  <i18n path="Common.Logout" />
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-btn class="ma-2" outlined color="primary" to="/login">
          <i18n path="Common.Login" />
        </v-btn>
      </div>
    </v-app-bar>

    <v-main
      class="greybg"
      :class="{
        'custom-nav-main': !$vuetify.breakpoint.smAndDown && drawer === null,
      }"
    >
      <v-container fluid>
        <v-row>
          <v-col>
            <div>
              <nuxt />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div v-if="logoutClicked">
      <iframe
        id="print"
        ref="iframe"
        style="width: 0; position: absolute; height: 0;"
        :src="`https://${$config.axios.backendBaseUrl}${$config.basePublicPath}/clear-cookie`"
        @load="iframecookieDeleted"
      />
    </div>
    <div>
      <!-- <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour> -->
      <v-tour name="myTour" :steps="steps" class="positionRelative">
        <template slot-scope="tour">
          <transition name="fade">
            <v-step
              v-if="tour.steps[tour.currentStep]"
              :key="tour.currentStep"
              :step="tour.steps[tour.currentStep]"
              :previous-step="tour.previousStep"
              :next-step="tour.nextStep"
              :stop="tour.stop"
              :skip="tour.skip"
              :is-first="tour.isFirst"
              :is-last="tour.isLast"
              :labels="tour.labels"
              class="primary pa-8 text-left tour-stepbox"
            >
              <template>
                <div slot="actions">
                  <div class="positionAbsolute" style="right: 0; top: 0;">
                    <v-btn icon @click="onCloseTour(tour.currentStep)">
                      <v-icon class="white--text">mdi-close</v-icon>
                    </v-btn>
                  </div>
                  <div class="d-flex">
                    <div class="d-flex" style="line-height: 36px;">
                      <div>{{ tour.currentStep + 1 }}</div>
                      /
                      <div>{{ tour.steps.length }}</div>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                      <!-- <v-btn text @click="tour.previousStep">
                        Normal
                      </v-btn> -->
                      <v-btn
                        v-if="tour.currentStep !== 0"
                        text
                        class="grey--text text--lighten-5"
                        @click="tour.previousStep"
                      >
                        <i18n path="Tour.Actions.Previous" />
                      </v-btn>
                      <v-btn
                        v-if="tour.currentStep !== 9"
                        text
                        class="white--text"
                        @click="tour.nextStep"
                      >
                        <i18n path="Tour.Actions.Next" />
                      </v-btn>
                      <v-btn
                        v-if="tour.currentStep === 9"
                        text
                        class="white--text"
                        @click="tour.skip"
                      >
                        <i18n path="Tour.Actions.LearnMore" />
                      </v-btn>
                    </div>
                  </div>
                </div>
              </template>
            </v-step>
          </transition>
        </template>
      </v-tour>
    </div>
  </v-app>
</template>

<script>
import OrgnaizationList from '~/components/common/organization-list'
import AppDrawer from '~/components/common/app-drawer'
import Help from '~/components/common/help'
import OldSite from '~/components/common/oldsite'
import Theme from '~/components/common/theme'
import Upgrade from '~/components/common/upgrade'
import userUtils from '~/utility/userApps'
import { postGaData } from '~/utility/index.js'
import { tourLoaderMixin } from '~/utility'
export default {
  middleware: ['auth', 'authorization'],
  components: {
    OrgnaizationList,
    AppDrawer,
    Help,
    OldSite,
    Upgrade,
    Theme,
  },
  mixins: [tourLoaderMixin],
  props: {
    source: { type: String, default: '' },
  },
  data() {
    return {
      currentUserStep: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      drawer: null,
      dialog1: false,
      dialog: false,
      notifications: false,
      sound: true,
      tabs: null,
      account: false,
      message: false,
      triggerReset: false,
      triggerRecEventReset: false,
      allowUpgrade: false,
      allowUser: false,
      activeClass: ' v-list-item--active',
      userPlanData: '',
      logoutClicked: false,
      items: [
        {
          icon: 'fa fa-grid',
          text: 'Eventboard',
          to: '/apps/event/eventboard',
        },
        { heading: 'Event' },
        {
          icon: 'fa fa-calendar',
          text: 'Events',
          to: '/apps/event/list/Event/live-and-draft-event',
          allowedRoutes: [
            '/apps/event/list/Event/eventInvitaionHistory',
            '/apps/event/event/',
          ],
        },
        {
          icon: 'fa fa-user-plus',
          text: 'Registrations',
          to: '/apps/event/list/Registrations/Registrations',
          allowedRoutes: ['/apps/event/registration'],
        },
        {
          icon: 'fa fa-address-book-o',
          text: 'Contacts',
          to: '/apps/event/list/Contacts/Contacts',
          allowedRoutes: [
            '/apps/event/contacts/',
            'apps/event/list/Contacts/Invites',
          ],
        },
        { heading: 'Promotions' },
        {
          icon: 'fa fa-building',
          text: 'Discount Code',
          to: '/apps/event/list/DiscountCodes/Discount-Codes',
          allowedRoutes: ['/apps/event/discountcodes'],
        },
      ],
    }
  },
  computed: {
    currentPage() {
      return this.$route.path
    },
    // steps() {
    //   return [
    //     {
    //       target: '#v-step-0',
    //       content: this.$t('Tour.Steps.Step-0-CreateEvent'),
    //       params: {
    //         placement: 'bottom',
    //       },
    //     },
    //     {
    //       target: '#v-step-1',
    //       content: this.$t('Tour.Steps.Step-1-Eventboard'),
    //       params: {
    //         placement: 'left',
    //       },
    //     },
    //     {
    //       target: '#v-step-2',
    //       content: this.$t('Tour.Steps.Step-2-Event'),
    //       params: {
    //         placement: 'left',
    //       },
    //     },
    //     {
    //       target: '#v-step-3',
    //       content: this.$t('Tour.Steps.Step-3-Registrations'),
    //       params: {
    //         placement: 'left',
    //       },
    //     },
    //     {
    //       target: '#v-step-4',
    //       content: this.$t('Tour.Steps.Step-4-Contacts'),
    //       params: {
    //         placement: 'left',
    //       },
    //     },
    //     {
    //       target: '#v-step-5',
    //       content: this.$t('Tour.Steps.Step-5-DiscountCodes'),
    //       params: {
    //         placement: 'left',
    //       },
    //     },
    //     {
    //       target: '#v-step-6',
    //       content: this.$t('Tour.Steps.Step-6-HelpCenter'),
    //       params: {
    //         placement: 'top',
    //       },
    //     },
    //     {
    //       target: '#v-step-7',
    //       content: this.$t('Tour.Steps.Step-7-LanguageSwitcher'),
    //       params: {
    //         placement: 'top',
    //       },
    //     },
    //     {
    //       target: '#v-step-8',
    //       content: this.$t('Tour.Steps.Step-8-AppDrawer'),
    //       params: {
    //         placement: 'top',
    //       },
    //     },
    //     {
    //       target: '#v-step-9',
    //       content: this.$t('Tour.Steps.Step-9-ProfileDetails'),
    //       params: {
    //         placement: 'top',
    //       },
    //     },
    //   ]
    // },
    // myOptions() {
    //   return {
    //     useKeyboardNavigation: false,
    //     labels: {
    //       buttonSkip: 'Skip tour',
    //       buttonPrevious: 'Previous',
    //       buttonNext: 'Next',
    //       buttonStop: 'Finish',
    //     },
    //   }
    // },
  },
  watch: {
    dialog1(newVal) {
      if (newVal) {
        postGaData('New', this.$t('Drawer.CreateEventAction'))
      }
    },
    dialog(newVal) {
      if (newVal) {
        postGaData('New', this.$t('Common.NewRecurringEvent'))
      }
    },
    currentLocale(newVal) {
      this.startTour()
    },
  },
  async created() {
    let token = this.$auth.strategy.token.get()
    if (token) {
      token = token.split(' ')[1]
    }
    await this.$apolloHelpers.onLogin(token, undefined, { expires: 7 })
  },
  mounted() {
    const userInfo = userUtils.userCurrentOrgInfo(this.$store) || {}
    const userRoles = userInfo.roles || []
    this.allowUser = userRoles.length === 1 && userRoles.includes('$orguser')
    this.allowUpgrade = userRoles.includes('$orgowner')
    window.addEventListener('message', this.messageReceived, false)
    // this.$tours.myTour.start()
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    onCloseTour(value) {
      this.currentUserStep = value
      this.$tours.myTour.stop()
    },
    startTour() {
      if (this.currentUserStep) {
        this.$tours.myTour.start(this.currentUserStep)
      } else {
        debugger
        this.$tours.myTour.start()
      }
    },
    onLogout(context) {
      if (this.$store.state.auth.loggedIn) {
        this.logoutClicked = true
      }
    },
    closeSingleEventForm() {
      this.dialog1 = false
    },
    closeRecurringEventForm() {
      this.dialog = false
    },
    matchRoute(toRoute) {
      return this.items.reduce((acc, i) => {
        if (!i.allowedRoutes || i.to !== toRoute) {
          return acc
        }
        const routeMatched = i.allowedRoutes.reduce((accc, j) => {
          return accc || this.currentPage.includes(j)
        }, false)
        return acc || routeMatched
      }, false)
        ? this.activeClass
        : ''
    },
    async userPlan() {
      const url = `${this.$bitpod.getApiUrl()}OrganizationInfos/getSubscription`
      try {
        const res = await this.$axios.$get(url)
        if (res) {
          const obj = res.filter((a) => {
            return a.isActive === true ? a : ''
          })
          this.userPlanData = obj[0].SubProduct.DisplayName
        }
      } catch (e) {
        console.error(
          `Error in layouts/event.vue in userPlan method while making get call to custom API to get users subscription, context: ${url} `,
          e
        )
      }
    },
    iframecookieDeleted() {
      console.log(
        'document.cookie that is passed to clear cookie',
        document.cookie
      )
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    messageReceived(e) {
      console.log('message received from the the iframe', e.data)
      if (e.data === 'success' && this.logoutClicked) {
        this.$auth.logout()
        this.$apolloHelpers.onLogout()
      }
    },
  },
  head() {
    return {
      title: this.$t('Common.AppTitle') + ' ' + this.$t('Common.Bitpod'),
    }
  },
}
</script>
<style>
.tour-stepbox {
  min-width: 300px !important;
}
.v-step__arrow::before {
  margin-left: 0 !important;
}
.v-step {
  max-width: 400px !important;
}
</style>
