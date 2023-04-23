import { HttpMethods, UrlFieldTypes, ResponseTypes } from '../gomarvin/predefined'
import { Endpoint, Module } from '../gomarvin/interfaces'
import { existing_controllers, stringExistsInArray } from './index'

export function addCrudEndpoints(module: Module) {
  let already_existing_endpoints = module.endpoints
  let module_name = module.name
  let module_name_url = `/${module_name.toLowerCase()}`

  let getMany: Endpoint = {
    url: module_name_url,
    method: HttpMethods.GET,
    response_type: ResponseTypes.with_pagination,
    controller_name: `Get${module_name}s`,
    url_params: [],
    body: [],
  }
  let getOne: Endpoint = {
    url: module_name_url,
    method: HttpMethods.GET,
    response_type: ResponseTypes.default,
    controller_name: `Get${module_name}`,
    url_params: [
      {
        field: 'id',
        type: UrlFieldTypes.INT,
      },
    ],
    body: [],
  }
  let postOne: Endpoint = {
    url: module_name_url,
    method: HttpMethods.POST,
    response_type: ResponseTypes.default,
    controller_name: `Create${module_name}`,
    url_params: [],
    body: [],
  }
  let deleteOne: Endpoint = {
    url: module_name_url,
    method: HttpMethods.DELETE,
    response_type: ResponseTypes.default,
    controller_name: `Delete${module_name}`,
    url_params: [],
    body: [],
  }
  let updateOne: Endpoint = {
    url: module_name_url,
    method: HttpMethods.PUT,
    response_type: ResponseTypes.default,
    controller_name: `Update${module_name}`,
    url_params: [],
    body: [],
  }

  let crud_endpoints = [getMany, getOne, postOne, deleteOne, updateOne]

  let taken_controllers = existing_controllers(already_existing_endpoints)
  console.log(taken_controllers)

  for (let i = 0; i < crud_endpoints.length; i++) {
    let new_controller_name = crud_endpoints[i].controller_name

    // if the predefined controller name doesn't exist in the array of 
    // the current controllers, append it.
    if (!stringExistsInArray(taken_controllers, new_controller_name)) {
      already_existing_endpoints.push(crud_endpoints[i])
    }
  }
}
