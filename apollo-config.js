// export default function (ctx) {
//   console.log(ctx)
//   return {
//     httpEndpoint: process.server
//             ? "http://localhost:8000/graphql",
//             : "/graphql"
//   }
// }

// import { createNetworkInterface } from 'apollo-client'

// export default createNetworkInterface({
// 	uri: 'https://event.test.bitpod.io/svc/graphql',
// 	transportBatching: true
// })

import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {
  setContext
} from 'apollo-link-context';

const middlewareLink = setContext(() =>  {
  let requestHeaders= {
    headers: {
      Authorization: authState ? "Bearer " + authState.access_token : null,
    },
    accessToken: authState ? "Bearer " + authState.access_token : ""
  }
  return requestHeaders;
});

// make sure to export default
export default (ctx) => {
  // compose your Links here for the current client
  const appLink = new HttpLink({ uri: 'https://graphql-url.com' })
  // here you can place your middleware. ctx has the context forwarded from Nuxt

  // return the an object with additional apollo-client options
  return {
    link: middlewareLink.concat(appLink),
    cache: new InMemoryCache(),
    dataIdFromObject: o => o.id
  }
}