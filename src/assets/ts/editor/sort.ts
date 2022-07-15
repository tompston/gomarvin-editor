import * as predefined from '../gomarvin/predefined'
import { Endpoint } from '../gomarvin/interfaces'

/**
 * Pass down the endpoints array and return a new
 * sorted array based on the predefined.HttpMethods object
 */
export function endpoints_sorted_by_http_method(endpoints: any) {
  let sorted_http = Object.values(predefined.HttpMethods)
  let ordered_endpoints = []

  for (var i = 0; i < sorted_http.length; i++) {
    let http_method = sorted_http[i]

    // console.log(`http_method    :: ${http_method}`)

    for (var endp = 0; endp < endpoints.length; endp++) {
      let curr_endpoint_method = endpoints[endp].method

      if (curr_endpoint_method == http_method) {
        ordered_endpoints.push(endpoints[endp])
      }
    }
  }
  return ordered_endpoints
}
