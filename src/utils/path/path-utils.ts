import { isLetter } from "../character/character-utils";
import { findSymbols, getChar, getMoves, isPositionValid, markVisited } from "../map/map-utils";
import { MapDataSchemaProps, Position } from "../types/types";

/**
 * Result of the path walking process
 */
export type PathWalkerResultProps = {
  letters: string;
  path: string;
  isComplete: boolean;
};

/**
 * State of the path walker
 */
export type PathWalkerStateProps = {
  mapData: MapDataSchemaProps;
  collectedLetters: string;
  pathCharacters: string;
  previousPosition: Position | null;
  isComplete: boolean;
  isStuck: boolean;
};

/**
 * Finds the start and end positions in a map
 * @param mapData The map data
 * @returns Object containing start and end positions
 */
export const findStartAndEndPositions = (
  mapData: MapDataSchemaProps
): {
  startPosition: Position | null;
  endPosition: Position | null;
} => {
  const startPositions = findSymbols({ map: mapData.grid, symbol: "@" });
  const endPositions = findSymbols({ map: mapData.grid, symbol: "x" });

  return {
    startPosition: startPositions ? startPositions[0] : null,
    endPosition: endPositions ? endPositions[0] : null,
  };
};

/**
 * Creates the initial state for the path walker
 * @param mapData The map data
 * @returns The initial path walker state
 */
export const createPathWalkerState = (mapData: MapDataSchemaProps): PathWalkerStateProps => {
  const { startPosition, endPosition } = findStartAndEndPositions(mapData);

  if (!startPosition) {
    throw new Error("No start position found in the map");
  }

  if (!endPosition) {
    throw new Error("No end position found in the map");
  }

  // Mark the start position as visited and set it as the current position
  const updatedMapData = {
    ...mapData,
    currentPosition: startPosition,
  };

  const startChar = getChar({
    map: updatedMapData.grid,
    row: startPosition.x,
    col: startPosition.y,
  });

  return {
    mapData: markVisited(updatedMapData, startPosition.x, startPosition.y),
    collectedLetters: "",
    pathCharacters: startChar || "",
    previousPosition: null,
    isComplete: false,
    isStuck: false,
  };
};

/**
 * Finds the next valid move from the current position
 * @param state The current path walker state
 * @returns The next position or null if no valid move is found
 */
export const findNextMove = (state: PathWalkerStateProps): Position | null => {
  const { mapData, previousPosition } = state;
  const { grid, currentPosition } = mapData;

  const possibleMoves = getMoves(currentPosition);

  const validMoves = possibleMoves.filter((pos) => {
    if (!isPositionValid(grid, pos)) return false;

    const char = getChar({ map: grid, row: pos.x, col: pos.y });
    if (char === null || char === " ") return false;

    return !(previousPosition && pos.x === previousPosition.x && pos.y === previousPosition.y);
  });

  const currentChar = getChar({
    map: grid,
    row: currentPosition.x,
    col: currentPosition.y,
  });
  if (previousPosition && (currentChar === "|" || currentChar === "-" || currentChar === "+")) {
    // Calculate current direction
    const dx = currentPosition.x - previousPosition.x;
    const dy = currentPosition.y - previousPosition.y;
    const isVertical = dy === 0;

    const continuingMove = validMoves.find((pos) => {
      if (isVertical) {
        return (
          pos.y === currentPosition.y &&
          Math.abs(pos.x - currentPosition.x) === 1 &&
          (dx === 0 || Math.sign(pos.x - currentPosition.x) === Math.sign(dx))
        );
      } else {
        return (
          pos.x === currentPosition.x &&
          Math.abs(pos.y - currentPosition.y) === 1 &&
          (dy === 0 || Math.sign(pos.y - currentPosition.y) === Math.sign(dy))
        );
      }
    });

    if (continuingMove) {
      return continuingMove;
    }
  }

  // For debugging
  return validMoves.length > 0 ? validMoves[0] : null;
};

/**
 * Updates the state with a new move
 * @param state The current path walker state
 * @param nextPosition The next position to move to
 * @returns The updated state
 */
export const makeMove = (state: PathWalkerStateProps, nextPosition: Position): PathWalkerStateProps => {
  const { mapData, collectedLetters, pathCharacters } = state;
  const { grid, currentPosition } = mapData;

  const nextChar = getChar({
    map: grid,
    row: nextPosition.x,
    col: nextPosition.y,
  });
  if (nextChar === null) return state;
  const updatedPathChars = pathCharacters + nextChar;
  let updatedLetters = collectedLetters;
  if (isLetter(nextChar)) {
    updatedLetters += nextChar;
  }

  const updatedMapData = {
    ...mapData,
    currentPosition: nextPosition,
  };

  const isComplete = nextChar === "x";

  return {
    mapData: markVisited(updatedMapData, nextPosition.x, nextPosition.y),
    collectedLetters: updatedLetters,
    pathCharacters: updatedPathChars,
    previousPosition: currentPosition,
    isComplete,
    isStuck: false,
  };
};
