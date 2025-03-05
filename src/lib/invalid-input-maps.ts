export type Map = string[][];

/**
 * Invalid Map: Missing start character
 * (No '@' is present.)
 */
export const invalidInput1: Map = [
  ["x", " ", " ", "-", "A", "-", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
  ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
  [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
  [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];

/**
 * Invalid Map: Missing end character
 * (No 'x' is present.)
 */
export const invalidInput2: Map = [
  [" ", " ", " ", "@", "-", "-", "A", "-", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", "+", "-", "-", "B", "-", "-", "-", "+"],
  [" ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", "C", " ", " ", " ", " ", " ", " ", " "],
];

/**
 * Invalid Map: Multiple starts
 * (More than one '@' is present.)
 */
export const invalidInput3: Map = [
  ["@", "-", "A", "-", "@", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " "],
  ["x", "-", "B", "-", "+", " ", "C"],
];

/**
 * Invalid Map: Fork in path
 * (A turn leads to more than one valid path.)
 */
export const invalidInput4: Map = [
  // Top row with extra element to simulate a fork near the upper part.
  [" ", " ", " ", "x", "-", "B"],
  [" ", " ", " ", " ", "|", " "],
  // Start row with '@'
  ["@", "-", "-", "A", "-", "-", "+"],
  [" ", " ", " ", " ", "|", " "],
  // Row where the fork occurs: two valid options
  [" ", "x", "+", " ", " ", "C"],
  [" ", " ", "|", " ", "|", " "],
  [" ", " ", "+", "-", "-", "+"],
];

/**
 * Invalid Map: Broken path
 * (The path stops unexpectedly.)
 */
export const invalidInput5: Map = [
  ["@", "-", "A", "-", "+", " "],
  [" ", " ", " ", " ", "|", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "B", "-", "x"],
];

/**
 * Invalid Map: Multiple starting paths
 * (When starting from '@', there is more than one valid adjacent cell.)
 */
export const invalidInput6: Map = [["x", "-", "B", "-", "@", "-", "A", "-", "x"]];

/**
 * Invalid Map: Fake turn
 * (A '+' is used even though the path could continue straight.)
 */
export const invalidInput7: Map = [["@", "-", "A", "-", "+", "-", "B", "-", "x"]];
