export function getData(path) {
  const URL = `https://event.test.bitpod.io/svc/api`
  return async function query(options) {
    // options contains sort, pagination, search, filters data
    // 1. sort
    // 2. pagination
    // 3. search
    // 4. filters
    const res = await this.$axios.$get(`${URL}${path}`)
    return { items: res }
  }
}
// export async function getAllUsers(options){
//     return this.$axios()
// }

export const getAllUsers = getData.bind(null, 'users')
