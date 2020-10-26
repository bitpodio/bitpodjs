import getApiUrl from './getApiUrl'

export default (context, inject) => {
  const bitpod = {
    getApiUrl,
  }
  inject('bitpod', bitpod)
  context.$bitpod = bitpod
}
