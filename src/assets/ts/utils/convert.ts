export function convertToLowerCase(x: string): string {
    return x.toLowerCase()
}
export function convertToLetters(x: string): string {
    return x.replace(/[^a-zA-Z]+/g, '')
}
export function removedWhitespace(x: string): string {
    return x.replace(/\s/g, '')
}
export function convertToInt(x: string): string {
    return x.replace(/[^0-9]+/g, '')
}
export function firstLetterIsSlash(x: string): string {
    return x.replace(x.charAt(0), '/')
}
/** https://flaviocopes.com/how-to-uppercase-first-letter-javascript/ */
export function firstLetterCapitalized(x: string): string {
    return x.charAt(0).toUpperCase() + x.slice(1)
}
/**  https://stackoverflow.com/questions/2651988/allow-only-alphabets-and-underscore-using-javascript */
export function LettersAndUnderscores(x: string): string {
    return x.replace(/[^a-zA-Z\_]+/g, '')
}
