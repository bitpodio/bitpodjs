<template>
  <div>
    <Header />
    <div class="search-section mt-6">
      <div class="text-center">
        <div>
          <h2 class="black--text pt-5 pb-0 text-h5">
            {{ $t('Common.SearchRegistration') }}
          </h2>
        </div>
        <div class="mb-2">{{ $t('Common.ViewRegistrations') }}</div>
      </div>
      <v-card class="search-section-box pa-4">
        <div class="text-center fs-20">
          {{ $t('Common.ViewCancelationCharges') }}
        </div>
        <div class="mt-3 fs-14 pl-4">{{ $t('Common.EmailUsed') }}</div>
        <v-card-text class="pt-0">
          <v-form
            :id="formName"
            ref="form"
            v-model="valid"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col cols="12" class="mt-3 pb-0">
                <v-text-field
                  v-model="formData.id"
                  :label="$t('Common.RegistrationIdRequired')"
                  :rules="[rules.required]"
                  required
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-3 pb-0">
                <v-text-field
                  v-model="formData.email"
                  :rules="[rules.email]"
                  :label="$t('Common.Email')"
                  required
                  dense
                ></v-text-field>
              </v-col> </v-row></v-form
        ></v-card-text>
        <v-card-actions class="px-4">
          <v-btn
            depressed
            block
            color="primary"
            type="submit"
            :disabled="!valid"
            form="search-form"
            @click="route()"
          >
            {{ $t('Common.Search') }}
          </v-btn></v-card-actions
        >
        <div>
          <v-btn plain text color="primary" @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            <span class="fs-14">{{ $t('Common.FindRegistration') }}</span>
          </v-btn>
        </div>

        <div v-show="show" class="px-4 fs-14">
          {{ $t('Common.RegistrationMentioned') }}
        </div>
        <div class="px-4 fs-14 mt-2">
          {{ $t('Common.ContactMessage') }}
          <span class="blue--text">support@bitpod.io</span>
        </div>
      </v-card>
    </div>
    <Footer />
  </div>
</template>

<script>
import { rules } from '~/utility/rules.js'
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
export default {
  layout: 'public',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      formData: {
        id: '',
        email: '',
      },
      valid: false,
      rules: rules(this.$i18n),
      show: false,
    }
  },
  methods: {
    route() {
      this.$router.push(
        this.localePath(
          `/myRegistration/${this.formData.id}?email=${this.formData.email}`
        )
      )
    },
  },
}
</script>
<style scoped>
.search-section {
  max-width: 450px;
  margin: 0 auto;
}
</style>
