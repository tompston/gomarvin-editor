import { stringExistsInArray } from '.'

export function canCreateNewEndpoint(
  existing_controllers: string[],
  new_controller_name: string,
): boolean {
  if (
    stringExistsInArray(existing_controllers, new_controller_name) ||
    new_controller_name.length <= 2 ||
    new_controller_name == 'ControllerName' ||
    new_controller_name == '' ||
    new_controller_name == 'this'
  ) {
    return false
  }
  return true
}

export function canCreateNewBodyField(
  existing_body_fields: string[],
  new_body_field: string,
): boolean {
  if (
    stringExistsInArray(existing_body_fields, new_body_field) ||
    new_body_field.length <= 1 ||
    new_body_field == '' ||
    new_body_field == 'this'
  ) {
    return false
  }
  return true
}
