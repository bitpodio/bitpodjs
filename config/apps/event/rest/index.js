// import nuxtconfig from '~/nuxt.config'
import { getOrderQuery, buildQueryVariables } from '~/utility'

export function getData(modelName, isExporting = false) {
  return async function query(options) {
    if (isExporting) {
      const itemsPerPage = options.itemsPerPage === -1 ? -1 : 50
      let skip = 0
      const limit = itemsPerPage === -1 ? 0 : itemsPerPage

      if (itemsPerPage !== -1) {
        const { content, viewName } = this
        const sortBy = options.sortBy
        const sortDesc = options.sortDesc
        const order = getOrderQuery(content, viewName, sortBy, sortDesc)

        const where = buildQueryVariables({
          viewName,
          search: options.search,
          filters: options.filters,
          filter: this.filter,
          content,
          ctx: this,
        })
        const apiUrl = this.$bitpod.getApiUrl()

        // to get record count
        const recCountPromise = this.$axios.$get(
          `${apiUrl}${modelName}/count?where=${JSON.stringify(where)}`
        )

        const count =
          Math.floor((await recCountPromise).count / itemsPerPage) *
          itemsPerPage
        let formattedResult = []

        while (skip <= count && this.$store.state.exportInProgress) {
          const filter = { limit, skip, order, where }
          const resPromise = this.$axios.$get(
            `${apiUrl}${modelName}?filter=${JSON.stringify(filter)}`
          )

          formattedResult = formattedResult.concat(await resPromise)
          skip += 50
        }
        if (this.$store.state.exportInProgress) return formattedResult
      }
      return []
    } else {
      // options contains sort, pagination, search, filters data

      // pagination
      const page = options.page || 1
      const itemsPerPage = options.itemsPerPage || 10
      const skip = (page - 1) * (itemsPerPage || 10)
      const limit = itemsPerPage === -1 ? 0 : itemsPerPage

      // sort
      const { content, viewName } = this
      const sortBy = options.sortBy
      const sortDesc = options.sortDesc
      const order = getOrderQuery(content, viewName, sortBy, sortDesc)

      // search, filters
      const where = buildQueryVariables({
        viewName,
        search: options.search,
        filters: options.filters,
        filter: this.filter,
        content,
        ctx: this,
      })
      const filter = { limit, skip, order, where }
      const apiUrl = this.$bitpod.getApiUrl()

      const resPromise = this.$axios.$get(
        `${apiUrl}${modelName}?filter=${JSON.stringify(filter)}`
      )
      // to get record count
      const recCountPromise = this.$axios.$get(
        `${apiUrl}${modelName}/count?where=${JSON.stringify(where)}`
      )
      // to execute parallel call
      const [res, recCount] = await Promise.all([resPromise, recCountPromise])

      return { items: res, total: recCount.count }
    }
  }
}
// export async function getAllUsers(options){
//     return this.$axios()
// }

export const getAllUsers = getData.bind(null, 'users')

export function getLookupData(path) {
  return async function query(field) {
    const URL = `${this.$bitpod.getApiUrl()}`
    const res = await this.$axios.$get(`${URL}${path}`)
    return res
  }
}

export function getCustomData(modelName) {
  return async function query(options) {
    // pagination
    const page = options.page || 1
    const itemsPerPage = options.itemsPerPage || 10
    const skip = (page - 1) * (itemsPerPage || 10)
    const limit = itemsPerPage === -1 ? 0 : itemsPerPage

    const apiUrl = this.$bitpod.getApiUrl()
    const resPromise = this.$axios.$get(`${apiUrl}${modelName}`)
    // to execute parallel call
    const [res] = await Promise.all([resPromise])
    if (this.viewName !== 'integrations' && this.viewName !== 'integration') {
      const skipRes = res.slice(skip)
      const finalRes = skipRes.slice(0, limit)
      return { items: finalRes, total: res.length }
    } else {
      return { items: res, total: res.length }
    }
  }
}

export function getLoginData(modelName) {
  return async function query(options) {
    // pagination
    const page = options.page || 1
    const itemsPerPage = options.itemsPerPage || 10
    const skip = (page - 1) * (itemsPerPage || 10)
    const limit = itemsPerPage === -1 ? 0 : itemsPerPage
    const apiUrl = this.$config.id4ServerUrl
    const res = await this.$axios.$get(`${apiUrl}${modelName}`)

    const skipRes = res.slice(skip)
    const finalRes = skipRes.slice(0, limit)
    return { items: finalRes, total: res.length }
  }
}
