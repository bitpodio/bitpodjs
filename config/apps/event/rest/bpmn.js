export async function getBPMNData(options) {
  const res = await this.$axios.$get(`/svc/api/s?pageNumber=`)
  // const items = [
  //   {
  //     FirstName: '',
  //     LastName: '',
  //   },
  // ]
  return { items: res, total: 10 }
}
