import { Endpoint, Module, Body, UrlParam } from '../gomarvin/interfaces'

/** Pass down the array that holds the endpoints and return an array that holds strings of the controller names */
export function existing_controllers(endpoints: Endpoint[]): string[] {
  let controllers = []
  for (let i = 0; i < endpoints.length; i++) {
    let c = endpoints[i].controller_name
    controllers.push(c)
  }
  return controllers
}

/** Pass down the endpoint and return an array of already existing module names. */
export function existing_body_params(endpoint_body: Body[]): string[] {
  let body_params = []
  for (let i = 0; i < endpoint_body.length; i++) {
    body_params.push(endpoint_body[i].field)
  }
  return body_params
}

/** */
export function existing_url_params(url_params: UrlParam[]): string[] {
  let existing_url_params = []
  for (let i = 0; i < url_params.length; i++) {
    existing_url_params.push(url_params[i].field)
  }
  return existing_url_params
}

/** Pass down the modules from the config file and return an array of already existing module names. */
export function existing_module_names(modules: Module[]): string[] {
  let existing_module_names = []
  for (let i = 0; i < modules.length; i++) {
    let existing_module_name = modules[i].name
    existing_module_names.push(existing_module_name)
  }
  return existing_module_names
}
