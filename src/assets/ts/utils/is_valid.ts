/** If the last value of the string is an invalid value, return true */
export function lastCharIsInvalidValue(x: string, invalid_value: string): boolean {
  let last_char_of_x = x.charAt(x.length - 1)

  if (x.length >= 2 && last_char_of_x == invalid_value) {
    return true
  }
  return false
}
