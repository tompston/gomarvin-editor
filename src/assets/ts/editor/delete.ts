import { Endpoint, Module, Body, UrlParam } from '../gomarvin/interfaces'

/** Delete the module that has input name */
export function deleteModule(modules: Module[], module_name: string) {
  for (let i = 0; i < modules.length; i++) {
    let existing_module = modules[i]

    if (existing_module.name == module_name) {
      modules.splice(i, 1)
    }
  }
}

/**
 * Pass down array of values and a value from the  array.
 * If the passed down value matches a value in the array, delete it
 */
export function deleteValueFromArray(arr: [], array_value: any) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == array_value) {
      arr.splice(i, 1)
    }
  }
}
