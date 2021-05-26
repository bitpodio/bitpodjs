<template>
  <v-col class="px-0">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      content-class="slide-form-default"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text small v-bind="attrs" v-on="on" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon>
          <i18n path="Common.AddExistingContact" />
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="pl-md-10 pl-lg-10 pl-xl-15 pr-1 pb-0 pt-1 d-flex align-start"
        >
          <h2 class="black--text pt-5 pb-4 font-weight-regular text-h5">
            <i18n path="Common.AddExistingContact" />
          </h2>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon @click="onClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container v-if="content" class="pt-0 px-4 pb-8 inviteeDialog">
            <div v-if="dialog">
              <Grid
                :value="selectedList"
                view-name="allContacts"
                :content="content"
                class="mt-n12"
                @onSelectedListChange="updateList"
              />
            </div>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="px-xs-3 px-md-10 px-lg-10 px-xl-15 px-xs-10 pl-xs-10"
        >
          <SaveBtn
            v-if="dialog"
            color="primary"
            :label="this.$t('Drawer.Save')"
            depressed
            :action="onSave"
          ></SaveBtn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import Grid from '~/components/common/grid'
import { configLoaderMixin } from '~/utility'
import SaveBtn from '~/components/common/saveButton'
export default {
  components: {
    Grid,
    SaveBtn,
  },
  mixins: [configLoaderMixin],
  props: {
    refresh: {
      type: Function,
      default: () => false,
    },
  },

  data() {
    return {
      dialog: false,
      selectedList: [],
      itemId: [],
      ParentCustomerId: '',
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.Member : null
    },
  },
  methods: {
    onClose() {
      this.dialog = false
    },
    async onSave() {
      this.selectedList.map((ele) => {
        this.itemId.push(ele.id)
      })
      const url = this.$bitpod.getApiUrl()
      try {
        const res = await this.$axios.$get(
          `${url}Customers/${this.$route.params.id}`
        )
        if (res) {
          const contactId = res.ContactId
          this.itemId.forEach((ele) => {
            contactId.push(contactId.includes(ele) ? '' : ele)
          })
          this.setCustomers(contactId)
        }
      } catch (err) {
        console.error(
          `Error in templates/grids/memberContacts-grid/actions/grid/add-existing-contacts.vue while making a PATCH call to Customers model from method onSave context:- URL:-${url}`,
          err
        )
      }
    },

    async setCustomers(contactId) {
      const url = this.$bitpod.getApiUrl()
      try {
        const res1 = await this.$axios.$patch(
          `${url}Customers/${this.$route.params.id}`,
          {
            ContactId: contactId,
          }
        )
        if (res1) {
          this.dialog = false
          this.$eventBus.$emit('eventInvites-grid-refresh', 'memberContacts')
        }
      } catch (err) {
        console.error(
          `Error in templates/grids/memberContacts-grid/actions/grid/add-existing-contacts.vue while making a PATCH call to Customers model from method onSave context:- URL:-${url}`,
          err
        )
      }
    },
    updateList(data) {
      this.selectedList = data
    },
  },
}
</script>
