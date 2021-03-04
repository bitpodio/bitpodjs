import Introduction from './introduction'
import API from './api'
import Integration from './integration'

export default function (config) {
  return {
    Introduction: Introduction(config),
    API,
    Integration,
  }
}
