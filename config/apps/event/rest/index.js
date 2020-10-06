// import nuxtconfig from '~/nuxt.config'
import { getOrderQuery, buildQueryVariables } from '~/utility'
import { getApiUrl } from '~/utility/index.js'

export function getData(modelName) {
  return async function query(options) {
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
    const apiUrl = getApiUrl()

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
// export async function getAllUsers(options){
//     return this.$axios()
// }

export const getAllUsers = getData.bind(null, 'users')

export function getLookupData(path) {
  const URL = `https://event.test.bitpod.io/svc/api`
  return async function query(field) {
    const res = await this.$axios.$get(`${URL}${path}`)
    return res
  }
}

export function getCustomData(modelName) {
  return async function query(options) {
    const apiUrl = getApiUrl()
    const resPromise = this.$axios.$get(`${apiUrl}${modelName}`)
    // to execute parallel call
    const [res] = await Promise.all([resPromise])
    console.log('response', res)
    console.log('response length', res.length)
    return { items: res, total: res.length }
  }
}
