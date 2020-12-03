import getApiUrl from './getApiUrl'

export default (context, inject) => {
  const bitpod = {
    getApiUrl: () => {
      return getApiUrl(context)
    },
  }
  inject('bitpod', bitpod)
  context.$bitpod = bitpod
}
