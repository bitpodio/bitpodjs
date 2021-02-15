<template>
  <div>
    <iframe
      :src="iFrameSrc.url"
      :role="iFrameSrc.role"
      class="help-doc"
    ></iframe>
  </div>
</template>

<script>
import HelpCenter from '~/config/apps/help'

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
        ? { url: src.url, role: src.role }
        : this.$nuxt.error({ statusCode: 404 })
    },
  },
  created() {
    Object.keys(HelpCenter).forEach((sectionName) => {
      Object.keys(HelpCenter[sectionName].views).forEach((viewName) => {
        const viewInfo = HelpCenter[sectionName].views[viewName]
        const urlParams = viewInfo.to.split('/')
        this.iFrameList = this.iFrameList.concat({
          name: urlParams[urlParams.length - 1],
          section: urlParams[urlParams.length - 2],
          url: viewInfo.dataSource.url,
          role: viewInfo.dataSource.role,
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
