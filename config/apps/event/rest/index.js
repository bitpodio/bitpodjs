export function getData(modelName) {
  return async function query(options) {
    // options contains sort, pagination, search, filters data
    // 1. sort
    // 2. pagination
    // 3. search
    // 4. filters
    const res = await this.$axios.$get(
      `https://event.test.bitpod.io/svc/api/${modelName}s?filter={"limit":"10"}`
    )
    return { items: res, total: 10 }
  }
}
// export async function getAllUsers(options){
//     return this.$axios()
// }

export const getAllUsers = getData.bind(null, 'users')
