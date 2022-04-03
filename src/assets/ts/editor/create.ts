import { module_name_is_valid } from './editor'
import { init_body_fields, init_endpoint_fields } from './init'
import * as gomarvin_config from '../gomarvin/interfaces'
import * as predefined from '../gomarvin/predefined'

/**
 * @example
 * <button @click="editor.createNewModule(config.modules, newModuleName)">createNewModule</button>
 */
export function createNewModule(modules: gomarvin_config.Module[], new_module_name: string) {
  if (module_name_is_valid(modules, new_module_name)) {
    let new_module: gomarvin_config.Module = {
      name: new_module_name,
      endpoints: [],
    }
    modules.push(new_module)
  }
}

/** Pass down the reactive object that is binded to the new endpoint_value*/
export function CreateEndpointAndResetInputFields(
  module_endpints: any,
  new_endpoint_fields: gomarvin_config.Endpoint,
) {
  // create a new object from the reactive values to dereference it on push
  const new_endpoint: gomarvin_config.Endpoint = {
    url: new_endpoint_fields.url,
    method: new_endpoint_fields.method,
    controller_name: new_endpoint_fields.controller_name,
    url_params: [],
    body: [],
  }
  // push endpoint to endpoints array
  module_endpints.push(new_endpoint)
  // reset the endpoint info back to init fields
  Object.assign(new_endpoint_fields, init_endpoint_fields)
}

/** Pass down the reactive object that is binded to the new endpoint_value*/
export function CreateBodyFieldAndResetInputFields(endpoint_body: any, new_body_fields: gomarvin_config.Body) {
  // create a new object from the reactive values to dereference it on push
  const new_body_field: gomarvin_config.Body = {
    validate: new_body_fields.validate,
    field: new_body_fields.field,
    type: new_body_fields.type,
  }
  // push endpoint to endpoints array
  endpoint_body.push(new_body_field)
  // reset the endpoint info back to init fields
  Object.assign(new_body_fields, init_body_fields)
}

export function createNewUrlParam(body: any) {
  let new_url_param: gomarvin_config.UrlParam = {
    field: 'change_me',
    type: predefined.UrlFieldTypes.STRING,
  }
  body.push(new_url_param)
}
