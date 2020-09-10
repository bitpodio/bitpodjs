module.exports = Object.freeze({
  required: (v) => !!v || 'This field is required *',
  email: (v) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || 'Email is invalid',
  link: (v) => /^[a-z0-9]+$/i.test(v) || 'Lower case alphanumeric letters only',
})
