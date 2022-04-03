import { Endpoint, Module, Body, UrlParam } from '../gomarvin/interfaces'
import { existing_module_names } from './already_exists'
import { stringExistsInArray } from './editor'

/** If the new module name exists in array of already existing modules or is empty or less than 2 chars return false */
export function module_name_is_valid(modules: Module[], new_module_name: string): boolean {
  let existing_module_names_array = existing_module_names(modules)

  if (
    stringExistsInArray(existing_module_names_array, new_module_name) ||
    new_module_name.length == 0 ||
    new_module_name.length <= 2 ||
    new_module_name == 'Project' ||
    new_module_name == 'Import'
  ) {
    return false
  } else return true
}

export function custom_body_field_type_is_valid(x: string): boolean {
  if (x.length <= 1) {
    return false
  } else return true
}

export function isFloat(x: string): boolean {
  if (!isNaN(parseFloat(x))) {
    return true
  } else return false
}
