<template>
  <v-footer padless class="footer-main">
    <v-container>
      <v-row>
        <v-flex class="d-flex">
          <a class="text-decoration-none" href="/myRegistration"
            ><v-text class="fs-14 lh-28 text-decoration-none"
              ><i18n path="Common.MyRegistrations" /></v-text
          ></a>
          <span class="px-2 lh-28"><i18n path="Common.Pipe" /></span>
          <a
            class="text-decoration-none"
            href="https://www.bitpod.io/terms"
            target="_blank"
            ><v-text class="fs-14 lh-28"
              ><i18n path="Common.TermsofUse" /></v-text
          ></a>
          <span class="px-2 lh-28"><i18n path="Common.Pipe" /></span>
          <a
            class="text-decoration-none"
            href="https://www.bitpod.io/privacy-policy"
            target="_blank"
            ><v-text class="fs-14 lh-28"
              ><i18n path="Common.PrivacyPolicy" /></v-text
          ></a>
          <v-spacer></v-spacer>
          <a
            class="d-inline-flex text-decoration-none"
            href="https://www.bitpod.io"
            target="_blank"
          >
            <span class="mr-1 fs-14 mr-2 lh-28"
              ><i18n path="Common.PoweredBy"
            /></span>
            <v-img
              :src="$config.cdnUri + 'bitpod-logo-white.svg'"
              max-width="110"
            ></v-img>
          </a>
        </v-flex>
      </v-row>
    </v-container>
  </v-footer>
</template>
<style scoped>
.footer-main {
  background: #333;
  color: #b3b3b3;
  width: 100%;
}
.footer-main a {
  color: #b3b3b3 !important;
}
.lh-28 {
  line-height: 28px;
}
</style>
