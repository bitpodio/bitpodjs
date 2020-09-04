<template>
  <v-flex d-flex flex-md-row flex-lg-row flex-column>
    <v-flex column xs12 sm8 md8 lg8>
      <div class="xs12 sm8 md8 lg8 boxview pa-4 mr-2 mb-2">
        <v-row>
          <v-col class="col-md-12 col-12 pt-0">
            <v-card class="elevation-0">
              <v-list>
                <v-list-item class="pl-0">
                  <v-list-item-avatar size="62">
                    <v-avatar
                      color="primary"
                      size="62"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span class="white--text Twitter">{{
                        data.organization.Name
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <h2>{{ data.organization.Name }}</h2>
                    </v-list-item-title>
                    <v-list-item-subtitle class="pb-1">{{
                      data.organization.Email
                    }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{
                      data.organization.Mobile
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-if="content" class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-user-plus pr-1" aria-hidden="true"></i>Business Units
        </h2>
        <v-divider></v-divider>
        <Grid view-name="organizationBusinessUnit" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm12 md12 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-server pr-1" aria-hidden="true"></i> Subscriptions
        </h2>
        <v-divider></v-divider>
        <Grid
          view-name="organizationProductSubscription"
          :content="content"
          class="mt-11"
        />
      </div>
      <div v-if="content" class="xs12 sm12 md12 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-external-link pr-1" aria-hidden="true"></i> Tasks
        </h2>
        <v-divider></v-divider>
        <Grid view-name="organizationTasks" :content="content" />
      </div>
      <div v-if="content" class="xs12 sm12 md12 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-link1 pr-1" aria-hidden="true"></i> Integrations
        </h2>
        <v-divider></v-divider>
        <Grid view-name="organizationIntegration" :content="content" />
      </div>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mr-2 mb-2">
        <h2 class="body-1 pb-2">
          <i class="fa fa-image pr-1" aria-hidden="true"></i> Image Gallery
        </h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex column xs12 sm4 md4 lg4>
      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <h2 class="body-1 pb-1">
          <i class="fa fa-location pr-1" aria-hidden="true"></i> Organization
          Information
        </h2>
        <v-divider></v-divider>
        <v-row>
          <v-col class="col-md-12 col-12 pb-0">
            <div class="body-2 text--secondary">Address</div>
            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.AddressLine
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12 pb-0">
            <div class="body-2 text--secondary">City</div>
            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.City
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12 pb-0">
            <div class="body-2 text--secondary">State</div>
            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.State
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-6 col-12 pb-0">
            <div class="body-2 text--secondary">Zip</div>
            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.PostalCode
                )
              }}
            </div>
          </v-col>
          <v-col class="col-md-12 col-12 pb-0">
            <div class="body-2 text--secondary">Country</div>
            <div class="body-1">
              {{
                formatField(
                  data.organization._CurrentAddress &&
                    data.organization._CurrentAddress.Country
                )
              }}
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-cog pr-1" aria-hidden="true"></i> Settings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="seoForm = true">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Event Registration URL</div>
          <div class="body-1">
            {{ formatField(data.organization.EventRegistrationURL) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Success Template Caption</div>
          <div class="body-1">
            {{ formatField(data.organization.successTemplateCaption) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Currency</div>
          <div class="body-1">
            {{ formatField(data.organization.Currency) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Privacy Policy</div>
          <div class="body-1">
            {{ formatField(data.organization.PrivacyPolicy) }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-share-square-o pr-1" aria-hidden="true"></i> Social
            Media
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="seoForm = true">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Facebook</div>
          <div class="body-1">
            {{ formatField(data.organization.Facebook) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">Twitter</div>
          <div class="body-1">{{ formatField(data.organization.Twitter) }}</div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">LinkedIn</div>
          <div class="body-1">
            {{ formatField(data.organization.LinkedIn) }}
          </div>
        </v-flex>
      </div>

      <div class="xs12 sm4 md4 lg4 boxview pa-4 mb-2">
        <v-flex class="d-flex justify-center align-center pb-2">
          <h2 class="body-1 pb-1">
            <i class="fa fa-timer pr-1" aria-hidden="true"></i> Work Timings
          </h2>
          <v-spacer></v-spacer>
          <v-btn text small @click="seoForm = true">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>
        </v-flex>
        <v-divider></v-divider>
        <v-flex my-3>
          <div class="body-2 text--secondary">Start Time</div>
          <div class="body-1">
            {{ formatField(data.organization.AvailableStartHour) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">End Time</div>
          <div class="body-1">
            {{ formatField(data.organization.AvailableEndHour) }}
          </div>
        </v-flex>
        <v-flex my-3>
          <div class="body-2 text--secondary">working Days</div>
          <div class="body-1">
            <v-chip
              v-for="weekDay in data.organization.weekDay"
              :key="weekDay"
              small
              class="ma-1"
            >
              {{ weekDay }}
            </v-chip>
          </div>
        </v-flex>
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
import gql from 'graphql-tag'
import format from 'date-fns/format'
import Grid from '~/components/common/grid'
import organization from '~/config/apps/admin/gql/organization.gql'
import { formatGQLResult } from '~/utility/gql.js'
import { configLoaderMixin } from '~/utility'
export default {
  layout: 'admin',
  components: {
    Grid,
  },
  mixins: [configLoaderMixin],
  data() {
    return {
      loading: 0,
      data: {
        organization: {},
      },
    }
  },
  computed: {
    content() {
      return this.contents ? this.contents.organization : null
    },
  },
  methods: {
    formatDate(date) {
      return date ? format(new Date(date), 'PPp') : ''
    },
    formatField(fieldValue) {
      return fieldValue || '-'
    },
  },
  apollo: {
    data: {
      query() {
        return gql`
          ${organization}
        `
      },
      variables() {
        return {
          filters: {
            where: {
              id: this.$route.params.id,
            },
          },
        }
      },
      update(data) {
        const organization = formatGQLResult(data, 'OrganizationInfo')
        return {
          organization: organization.length > 0 ? organization[0] : {},
        }
      },
      result({ data, loading, networkStatus }) {},
      error(error) {
        this.error = error
        this.loading = 0
      },
      prefetch: false,
      loadingKey: 'loading',
      skip: false,
      pollInterval: 0,
    },
  },
}
</script>
