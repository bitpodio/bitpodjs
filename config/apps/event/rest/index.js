export function getItems(modelName) {
  return function query(options) {
    return this.$axios.get()
  }
}
// export async function getAllUsers(options){
//     return this.$axios()
// }

// export const getAllUsers = getItems.bind(null, 'users')
