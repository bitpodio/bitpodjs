<template>
  <div>
    <iframe
      v-if="iFrameSrc.requiresAuth ? $auth.loggedIn : true"
      :src="iFrameSrc.url"
      :role="iFrameSrc.role"
      class="help-doc"
    ></iframe>
    <div v-else class="px-2">
      {{ $t('Common.LoginRequired') }}
    </div>
  </div>
</template>

<script>
import HelpCenterFunc from '~/config/apps/help'

export default {
  layout: 'help-center',
  data() {
    return {
      iFrameList: [],
    }
  },
  computed: {
    iFrameSrc() {
      const sectionName = this.$route.params.section
      const pageName = this.$route.params.helpid
      const src = this.iFrameList.filter(
        (frame) => frame.name === pageName && frame.section === sectionName
      )?.[0]
      return src
        ? { url: src.url, role: src.role, requiresAuth: src.requiresAuth }
        : this.$nuxt.error({ statusCode: 404 })
    },
  },
  created() {
    const HelpCenter = HelpCenterFunc(this.$config)
    Object.keys(HelpCenter).forEach((sectionName) => {
      Object.keys(HelpCenter[sectionName].views).forEach((viewName) => {
        const viewInfo = HelpCenter[sectionName].views[viewName]
        const urlParams = viewInfo.to.split('/')
        this.iFrameList = this.iFrameList.concat({
          name: urlParams[urlParams.length - 1],
          section: urlParams[urlParams.length - 2],
          url: viewInfo.dataSource.url,
          role: viewInfo.dataSource.role,
          requiresAuth: viewInfo.requiresAuth || false,
        })
      })
    })
  },
}
</script>

<style scoped>
.help-doc {
  display: block;
  width: 100%;
  height: calc(100vh - 54px);
  border-width: 0;
}
</style>
