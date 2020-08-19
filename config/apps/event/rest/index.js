import { getOrderQuery, buildQueryVariables } from '~/utility'

export function getData(modelName) {
  return async function query(options) {
    // options contains sort, pagination, search, filters data

    // pagination
    const page = options.page || 1
    const itemsPerPage = options.itemsPerPage || 10
    const skip = (page - 1) * (itemsPerPage || 10)
    const limit = itemsPerPage === -1 ? 0 : itemsPerPage

    // sort
    const { content, viewName, contentName } = this
    const sortBy = options.sortBy
    const sortDesc = options.sortDesc
    const order = getOrderQuery(content, viewName, sortBy, sortDesc)

    // search, filters
    const where = buildQueryVariables({
      viewName,
      search: options.search,
      filters: options.filters,
      filter: this.filter,
      contentName,
      ctx: this,
    })

    const filter = { limit, skip, order, where }

    const resPromise = this.$axios.$get(
      `https://event.test.bitpod.io/svc/api/${modelName}s?filter=${JSON.stringify(
        filter
      )}`
    )
    // to get record count
    const recCountPromise = this.$axios.$get(
      `https://event.test.bitpod.io/svc/api/${modelName}s/count?where=${JSON.stringify(
        where
      )}`
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
