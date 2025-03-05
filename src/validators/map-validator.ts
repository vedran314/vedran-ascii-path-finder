import { getValidChars, isLetter, isPathChar } from "../utils/character/character-utils";
import { findSymbols } from "../utils/map/map-utils";
import { MapProps, Position } from "../utils/types/types";

// Define the ValidationResultProps type
export type ValidationResultProps = {
  isValid: boolean;
  errors: string[];
};

/**
 * Checks if a position has an adjacent path character or letter
 * @param map The map to check
 * @param pos The position to check
 * @returns True if the position has an adjacent path character or letter
 */
const positionHasPathCharacterNearby = (map: MapProps, pos: Position): boolean => {
  const { x, y } = pos;
  const directions = [
    { x: x - 1, y }, // Up
    { x, y: y + 1 }, // Right
    { x: x + 1, y }, // Down
    { x, y: y - 1 }, // Left
  ];

  return directions.some((dir) => {
    if (dir.x >= 0 && dir.x < map.length && dir.y >= 0 && dir.y < map[dir.x].length) {
      const char = map[dir.x][dir.y];
      // Consider both path characters and letters as valid path elements
      return isPathChar(char) || isLetter(char);
    }
    return false;
  });
};

/**
 * Checks if a character is a valid path element (path character, letter, start, or end)
 * @param char The character to check
 * @returns True if the character is a valid path element
 */
const isPathElement = (char: string): boolean => {
  return isPathChar(char) || isLetter(char) || char === "@" || char === "x";
};

/**
 *
 * Checks if the map has a broken path by looking for empty rows or columns between path elements
 * @param map The map to check
 * @returns True if the map has a broken path
 */
const hasBrokenPath = (map: MapProps): boolean => {
  // Check for empty rows between path elements
  for (let i = 1; i < map.length - 1; i++) {
    const rowHasPathElement = map[i].some((cell) => isPathElement(cell));

    if (!rowHasPathElement) {
      // Check if there are path elements above and below this empty row
      const hasPathAbove = map.slice(0, i).some((row) => row.some((cell) => isPathElement(cell)));
      const hasPathBelow = map.slice(i + 1).some((row) => row.some((cell) => isPathElement(cell)));

      if (hasPathAbove && hasPathBelow) {
        return true; // Found an empty row between path elements
      }
    }
  }

  // Find the maximum column length
  const maxColLength = Math.max(...map.map((row) => row.length));

  // Check for empty columns between path elements
  for (let j = 1; j < maxColLength - 1; j++) {
    let columnHasPathElement = false;

    for (let i = 0; i < map.length; i++) {
      if (j < map[i].length && isPathElement(map[i][j])) {
        columnHasPathElement = true;
        break;
      }
    }

    if (!columnHasPathElement) {
      // Check if there are path elements to the left and right of this empty column
      let hasPathLeft = false;
      let hasPathRight = false;

      for (let i = 0; i < map.length; i++) {
        // Check left
        for (let k = 0; k < j; k++) {
          if (k < map[i].length && isPathElement(map[i][k])) {
            hasPathLeft = true;
            break;
          }
        }

        // Check right
        for (let k = j + 1; k < maxColLength; k++) {
          if (k < map[i].length && isPathElement(map[i][k])) {
            hasPathRight = true;
            break;
          }
        }

        if (hasPathLeft && hasPathRight) {
          break;
        }
      }

      if (hasPathLeft && hasPathRight) {
        return true; // Found an empty column between path elements
      }
    }
  }

  return false;
};

/**
 * Checks if the map has fake turns (+ used when the path could continue straight)
 * @param map The map to check
 * @returns True if the map has fake turns
 */
const hasFakeTurns = (map: MapProps): boolean => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      // Check if the current cell is a turn character
      if (map[i][j] === "+") {
        // Count the number of horizontal and vertical connections
        let horizontalConnections = 0;
        let verticalConnections = 0;

        // Check left
        if (
          j > 0 &&
          (map[i][j - 1] === "-" || isLetter(map[i][j - 1]) || map[i][j - 1] === "@" || map[i][j - 1] === "x")
        ) {
          horizontalConnections++;
        }

        // Check right
        if (
          j < map[i].length - 1 &&
          (map[i][j + 1] === "-" || isLetter(map[i][j + 1]) || map[i][j + 1] === "@" || map[i][j + 1] === "x")
        ) {
          horizontalConnections++;
        }

        // Check up
        if (
          i > 0 &&
          (map[i - 1][j] === "|" || isLetter(map[i - 1][j]) || map[i - 1][j] === "@" || map[i - 1][j] === "x")
        ) {
          verticalConnections++;
        }

        // Check down
        if (
          i < map.length - 1 &&
          (map[i + 1][j] === "|" || isLetter(map[i + 1][j]) || map[i + 1][j] === "@" || map[i + 1][j] === "x")
        ) {
          verticalConnections++;
        }

        // If we only have horizontal or only vertical connections, this is a fake turn
        if (
          (horizontalConnections === 2 && verticalConnections === 0) ||
          (horizontalConnections === 0 && verticalConnections === 2)
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

/**
 * Validates a map according to the code challenge requirements
 * @param map The map to validate
 * @returns A validation result object with isValid flag and any error messages
 */
export const validateMap = (map: MapProps): ValidationResultProps => {
  const errors: string[] = [];

  // Check if map is empty
  if (!map || map.length === 0) {
    errors.push("Map cannot be empty");
    return { isValid: false, errors };
  }

  // Note: We don't check for even row lengths as jagged matrices are valid
  // according to the requirements

  // Check if map has exactly one start character '@'
  const startPositions = findSymbols({ map, symbol: "@" });
  if (!startPositions || startPositions.length === 0) {
    errors.push('Map must have exactly one start character "@"');
  } else if (startPositions.length > 1) {
    errors.push(`Map has ${startPositions.length} start characters "@", but must have exactly one`);
  }

  // Check if map has exactly one end character 'x'
  const endPositions = findSymbols({ map, symbol: "x" });
  if (!endPositions || endPositions.length === 0) {
    errors.push('Map must have exactly one end character "x"');
  } else if (endPositions.length > 1) {
    errors.push(`Map has ${endPositions.length} end characters "x", but must have exactly one`);
  }

  // Check if map has a valid path (this is a basic check, a full path validation would be more complex)
  if (startPositions && startPositions.length === 1 && endPositions && endPositions.length === 1) {
    // Check if there are any path characters connecting start and end
    const pathChars = ["-", "|", "+"];
    const hasPathChars = map.some((row) => row.some((cell) => pathChars.includes(cell)));

    if (!hasPathChars) {
      errors.push("Map must have path characters connecting start and end");
    }

    // Check if start position is adjacent to a path character
    const startPos = startPositions[0];
    if (!positionHasPathCharacterNearby(map, startPos)) {
      errors.push("Start position must be adjacent to a path character");
    }

    // Check if end position is adjacent to a path character
    const endPos = endPositions[0];
    if (!positionHasPathCharacterNearby(map, endPos)) {
      errors.push("End position must be adjacent to a path character");
    }

    // Check if the map has a broken path
    if (hasBrokenPath(map)) {
      errors.push("Map has a broken path - there is an empty row or column between path elements");
    }

    // Check if the map has fake turns
    if (hasFakeTurns(map)) {
      errors.push("Map has fake turns - a '+' is used where the path could continue straight");
    }
  }

  // Check for invalid characters
  const validChars = getValidChars();

  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!validChars.includes(cell)) {
        errors.push(`Invalid character "${cell}" at position [${i}, ${j}]`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
