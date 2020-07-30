export function state() {
  return {
    user: 'jagannath@bitpod.io',
    counter: 0,
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  },
}
