/** If the last value of the string is an invalid value, return true */
export function lastCharIsInvalidValue(x: string, invalid_value: string): boolean {
  let x_last_char = x.charAt(x.length - 1)

  if (x.length >= 2 && x_last_char == invalid_value) {
    return true
  }
  return false
}
