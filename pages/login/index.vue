<template>
  <v-layout column justify-center align-center class="login-view">
    <v-flex v-if="!hasProvider" xs12 sm8 md6 class="login-box">
      <v-card class="elevation-0 login-type">
        <v-card-title class="headline justify-center">
          <i18n path="Common.Login" />
        </v-card-title>
        <v-card-text class="justify-center text-center pa-6 pt-0">
          <v-btn
            class="mb-3 grey--text text-darken-3"
            tile
            outlined
            large
            block
            @click="loginBitpod"
          >
            <v-avatar>
              <img :src="$config.cdnUri + 'logo-favicon.png'" />
            </v-avatar>
            <i18n path="Common.SignInWithBitpod" />
          </v-btn>
          <v-flex justify-center align-center d-flex class="ma-2"
            ><i18n path="Common.Or"
          /></v-flex>
          <v-btn
            block
            class="mt-3 grey--text text-darken-3"
            tile
            outlined
            large
            color="grey"
            @click="loginGoogle"
          >
            <v-avatar>
              <img :src="$config.cdnUri + 'google.png'" class="login-google" />
            </v-avatar>
            <i18n path="Common.SignInWithGoogle" />
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
    <div>
      <iframe
        id="print"
        ref="iframe"
        :src="`https://bitpod-${$config.axios.backendBaseUrl}${$config.basePublicPath}/embed-cookie`"
        @load="iframeLoaded"
      >
      </iframe>
    </div>
  </v-layout>
</template>

<script>
export default {
  layout: 'logoutlayout',
  components: {},
  middleware: ['auth'],
  computed: {
    hasProvider() {
      return !!this.$route.query.p
    },
  },
  data() {
    return {
      orgName: '',
      redirectToOrg: false,
      setCookie:true,
    }
  },
  // async beforeMount() {
  //   const provider = this.$route.query.p
  //   if (provider) {
  //     return await this.$auth.loginWith(provider)
  //   }
  // },
  mounted() {
    debugger
    window.addEventListener('message', this.messageReceived, false)
    // if (
    //   this.$auth &&
    //   this.$auth.$state &&
    //   this.$auth.$state.user &&
    //   this.$auth.$state.user.data
    // ) {
    //   if (this.$auth.user.data.orgList.length) {
    //     this.orgName = this.$auth.user.data.orgList[0].name
    //     this.redirectToOrg = true
    //   }
    //   this.email = this.$auth.$state.user.data.email
    //   this.name = this.$auth.$state.user.data.name
    // } else {
    //   console.log('===>replacing')
    //   console.log('===>this.$auth', this.$auth)
    //   console.log('===>this.$auth.$state', this.$auth.$state)
    //   console.log('===>t this.$auth.$state.user', this.$auth.$state.user)
    //   console.log(
    //     '===>t this.$auth.$state.user.data',
    //     this.$auth.$state.user.data
    //   )
    //   // return redirect('/api/connect/userinfo')
    // }
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageReceived)
  },
  methods: {
    iframeLoaded() {
      console.log('all cookie while loading iframe', document.cookie)
      this.$refs.iframe.contentWindow.postMessage(document.cookie, '*')
    },
    messageReceived(e) {
      debugger
      console.log('in message received section', e)
      if (e.data === 'success' && this.setCookie) {
        console.log('inside setting cookies message received section', e.data)
        // document.cookie.split(';').forEach((c) => {
        //   document.cookie = c
        //     .replace(/^ +/, '')
        //     .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
        // })
        // document.cookie.split(';').forEach((c) => {
        //   document.cookie = c
        //     .replace(/^ +/, '')
        //     .replace(
        //       /=.*/,
        //       '=;expires=' +
        //         new Date().toUTCString() +
        //         `;path=${this.$config.basePublicPath}`
        //     )
        // })
        console.log('document cookie', document.cookie)
        this.setCookie = false
        // localStorage.clear()
        location.href = `https://bitpod-${this.$config.axios.backendBaseUrl}${this.$config.basePublicPath}/apps/event/list/Event/live-and-draft-event`
      }
    },
    async loginBitpod() {
      if (window.localStorage['auth.redirect']) {
        window.localStorage['auth.redirect'] = ''
      }
      const redirectCookie = this.$auth.$storage.getCookies()['auth.redirect']
      if (redirectCookie && redirectCookie.includes('get-started')) {
        document.cookie = `auth.redirect=${this.$config.basePublicPath}/get-started`
      } else {
        document.cookie = 'auth.redirect=' + ''
      }
      return await this.$auth.loginWith('bitpod')
    },
    async loginGoogle() {
      if (window.localStorage['auth.redirect']) {
        window.localStorage['auth.redirect'] = ''
      }
      const redirectCookie = this.$auth.$storage.getCookies()['auth.redirect']
      if (redirectCookie && redirectCookie.includes('get-started')) {
        document.cookie = `auth.redirect=${this.$config.basePublicPath}/get-started`
      } else {
        document.cookie = 'auth.redirect=' + ''
      }
      return await this.$auth.loginWith('google')
    },
  },
}
</script>

<style scoped>
.login-box {
  min-width: 450px;
}
.login-google {
  width: 30px;
  height: auto;
}
.login-view {
  height: calc(100vh - 120px);
}
.login-type {
  border: 1px solid #ddd;
}
@media screen and (max-width: 600px) {
  .login-box {
    min-width: fit-content !important;
  }
}
</style>
