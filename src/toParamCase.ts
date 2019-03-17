/**
 * Converts a camelCase string to a param-case one.
 * @param word camelCase word to be converted.
 */
export function toParamCase(word: string) {
    const letters = new Set(word.match(/[A-Z]/g));
    return Array.from(letters).reduce((newWord, letter) => {
        return newWord.replace(letter, `-${letter.toLowerCase()}`);
    }, word);
}