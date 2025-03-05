/**
 * Checks if a character is a valid path character
 * @param char The character to check
 * @returns True if the character is a valid path character
 */
export const isPathChar = (char: string): boolean => {
  return ["-", "|", "+"].includes(char);
};

/**
 * Checks if a character is a letter (A-Z)
 * @param char The character to check
 * @returns True if the character is a letter
 */
export const isLetter = (char: string): boolean => {
  return /^[A-Z]$/.test(char);
};

/**
 * Checks if a character is a valid character for the map
 * @param char The character to check
 * @returns True if the character is valid
 */
export const isValidChar = (char: string): boolean => {
  return isPathChar(char) || isLetter(char) || char === "@" || char === "x" || char === " ";
};

/**
 * Returns an array of all valid characters for the map
 * @returns Array of valid characters
 */
export const getValidChars = (): string[] => {
  return [
    "@",
    "x",
    "-",
    "|",
    "+",
    " ",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
};
