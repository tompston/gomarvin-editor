import {
  firstLetterIsSlash,
  removedWhitespace,
  LettersAndUnderscores,
  convertToLowerCase,
  firstLetterCapitalized,
  convertToLetters,
  convertToInt,
} from './convert'

/**
 * @param e     $event
 * @param func  function that converts string to a valid value
 * @returns     output string of the passed in functions
 * @example     @input="project_info.config_version = utils.ConvertToValidValue($event, utils.ValidConfigVersion)"
 */
export function ConvertToValidValue(e: any, func: any) {
  return func(e.target.value)
}

/**
 * - No whitespace
 * - Only lowercase
 */
export function ValidProjectName(x: string): string {
  return removedWhitespace(LettersAndUnderscores(convertToLowerCase(x)))
}
/**
 * - First letter capitalized
 * - No whitespace
 * - Only letter
 */
export function ValidModuleName(x: string): string {
  return firstLetterCapitalized(removedWhitespace(convertToLetters(x)))
}
/**
 * - No whitespace
 * - Only letter
 */
export function ValidControllerName(x: string): string {
  return removedWhitespace(convertToLetters(x))
}

/**
 * - No whitespace
 * - First letter is /
 */
export function ValidUrl(x: string): string {
  // return firstLetterIsSlash(removedWhitespace(lastCharCantBe(x, '/')))
  return firstLetterIsSlash(removedWhitespace(x))
}

/**
 * - no whitespace
 * - only letters and _ are allowed, as the string will be used as a variable inside the controller
 */
export function ValidUrlParam(x: string): string {
  return removedWhitespace(LettersAndUnderscores(x))
}

/**
 * - no whitespace
 * - only letters and _ are allowed, as the string will be used as a variable inside the controller
 */
export function ValidBodyField(x: string): string {
  return removedWhitespace(LettersAndUnderscores(x))
}

/**
 * - no whitespace
 */
export function ValidCustomBodyFieldType(x: string): string {
  return removedWhitespace(x)
}

/**
 * - no whitespace
 * - first letter is slash
 * - TODO :: only letters, numbers and /
 */
export function ValidApiPrefix(x: string): string {
  // return firstLetterIsSlash(removedWhitespace(lastCharCantBe(x, '/')))
  return firstLetterIsSlash(removedWhitespace(x))
}

/** */
export function ValidPort(x: string): string {
  return convertToInt(removedWhitespace(x))
}

/** */
export function ValidConfigVersion(x: string): string {
  return removedWhitespace(x)
}
/**
 * - No whitespace
 * - Only lowercase
 */
export function ValidValidateField(x: string): string {
  return removedWhitespace(x)
}
