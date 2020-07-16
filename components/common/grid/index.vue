<template>
  <div>
    <div class="grid-search-section">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="grid-search-input"
      ></v-text-field>
    </div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="tableData.items"
      :single-select="singleSelect"
      :loading="loading === 1"
      :options.sync="options"
      :server-items-length="tableData.total"
      item-key="id"
      show-select
      class="elevation-1"
      @update:pagination="updatePagination"
    >
      <!--<template v-slot:header.name="{ header }">
                    {{ header.text.toUpperCase() }} test
      </template>-->
      <!-- <template slot="header" slot-scope="props">
                    <tr>
                        <th>
                        <v-checkbox
                            :input-value="props.all"
                            :indeterminate="props.indeterminate"
                            primary
                            hide-details
                            @click.native="toggleAll"
                        ></v-checkbox>
                        </th>
                        <th
                        v-for="header in props.headers"
                        :key="header.text"
                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                        @click="changeSort(header.value)"
                        >
                        <v-icon small>arrow_upward</v-icon>
                        test
                        </th>
                    </tr>
      </template>-->
      <!-- <template v-slot:top>
                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>-->
    </v-data-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'
// import { axiosWrapper } from '../api/axios.js'
import EventFind from '~/config/apps/event/gql/eventlist.gql'

function getTableHeader(content, viewName) {
  const view = content.Views[viewName]
  const fields = view.Fields

  const headers = []
  for (const fieldName in fields) {
    const { caption, sortEnable, displayOrder, columnWidth } = fields[fieldName]
    headers.push({
      text: caption,
      value: fieldName,
      sortable: sortEnable,
      width: columnWidth,
      displayOrder,
    })
  }
  headers.sort((col1, col2) => col1.displayOrder - col2.displayOrder)
  return headers
}

function formatResult(data, modelName) {
  let { edges } = data[modelName][`${modelName}Find`]
  edges = edges.map(({ node }) => node)
  return edges
}

function formatCountData(data, modelName) {
  const count = data[modelName][`${modelName}Count`]
  return count
}

function getOrderQuery(sortBy, sortDesc) {
  // let {sortBy,sortDesc} = option;
  return `${sortBy && sortBy[0]} ${sortDesc && sortDesc[0] ? 'DESC' : 'ASC'}`
}

function buildSearchQueryVariables() {}

export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    viewName: {
      type: Object,
      required: true,
    },
  },
  data() {
    const headers = getTableHeader(this.content, this.viewName)
    return {
      singleSelect: false,
      selected: [],
      headers,
      tableData: {
        items: [],
        total: 0,
      },
      loading: 0,
      totalCount: 0,
      options: {},
      search: '',
    }
  },
  beforeDestroy() {
    // Perform the teardown procedure for someLeakyProperty.
    // (In this case, effectively nothing)
  },
  // watch: {
  //   options: {
  //     handler () {
  //         console.log(this);
  //         let page = this.options.page
  //         let pageSize = this.options.itemsPerPage
  //         this.limit = pageSize;
  //         this.skip = (page - 1) * pageSize;
  //     //  let {}
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    updatePagination(pagination) {},
  },
  apollo: {
    tableData: {
      query: gql`
        ${EventFind}
      `,
      variables() {
        // Use vue reactive properties here
        // let {limit,skip} = this;
        const sortBy = this.options.sortBy
        const sortDesc = this.options.sortDesc
        // let {,} = ;
        const order = getOrderQuery(sortBy, sortDesc)
        const where = buildSearchQueryVariables() || {}
        const skip = (this.options.page - 1) * this.options.itemsPerPage
        const limit = this.options.itemsPerPage
        return {
          filters: { limit, skip, order, where },
          where: {},
        }
      },
      update(data) {
        console.log(data)
        // The returned value will update
        // the vue property 'pingMessage'
        const tableData = {
          items: formatResult(data, 'Event'),
          total: formatCountData(data, 'Event'),
        }
        return tableData
      },
      // Optional result hook
      result({ data, loading, networkStatus }) {
        console.log('We got some result!')
      },
      error(error) {
        console.error("We've got an error!", error)
      },
      prefetch: false,
      loadingKey: 'loading',
      // pollInterval:0
    },
  },
  // created(){
  //
  //     axiosWrapper('/Events')
  //     .then(({data})=>{
  //         this.items = data;
  //     })
  // }
  // async mounted() {
  //     let result = await this.$apollo.query({
  //         query: gql`${EventFind}`,
  //         variables:{
  //             filters: {where:{}}, where:{}
  //         }
  //     });
  //     console.log(result)
  //     this.items = formatResult(result.data,"Event")
  // }
}
</script>

<style>
.grid-search-section {
  display: flex;
  justify-content: flex-end;
}
.grid-search-input {
  display: flex;
  max-width: 150px;
  padding: 0 10px;
}
</style>
