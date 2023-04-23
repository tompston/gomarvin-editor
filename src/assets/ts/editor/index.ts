export * from './crud'
export * from './delete'
export * from './create'
export * from './sort'
export * from './already_exists'
export * from './x_is_valid'
export * from './can_do_x'
export * from './init'

/** */
export function stringExistsInArray(arr: string[], x: string): boolean {
  if (arr.includes(x)) {
    return true
  } else return false
}

/** If the passed down string repeats more than 1 time in the array, return false */
export function duplicateStringExistsInArray(arr: string[], x: string): boolean {
  let filtered_array = arr.filter((value) => value == x)
  if (filtered_array.length != 1) {
    return true
  } else return false
}
