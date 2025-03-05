import { FindSymbolsProps, GetCharProps, MapDataSchemaProps, MapProps, Position } from "../types/types";

/**
 * Creates a map with the given grid and initializes the visited array.
 * @param grid The grid representing the map
 * @returns The map data schema
 */
export const createMap = (grid: string[][]): MapDataSchemaProps => ({
  grid,
  // sets default visited to false
  visited: grid.map((row) => row.map(() => false)),
  currentPosition: { x: 0, y: 0 },
});

/**
 * Finds all instances of a specific symbol in the map and returns their positions.
 * @param param0 An object containing the map and the symbol to search for
 * @returns An array of positions where the symbol is found, or null if not found
 */
export const findSymbols = ({ map, symbol }: FindSymbolsProps): Position[] | null => {
  // Flatten the grid to find positions matching the symbol
  const flatted = map.flatMap((x, i) => x.map((y, j) => (y === symbol ? { x: i, y: j } : null)));
  const symbolsFiltered = flatted.filter((pos): pos is Position => pos !== null);

  return symbolsFiltered.length > 0 ? symbolsFiltered : null;
};

/**
 * Gets the character at the specified row and column in the map.
 * @param param0 An object containing the map, row, and col
 * @returns The character at the specified position, or null if out of bounds
 */
export const getChar = ({ map, row, col }: GetCharProps): string | null => {
  if (row < 0 || col < 0 || row >= map.length || col >= map[row].length) {
    return null;
  }
  return map[row][col];
};

/**
 * Checks if a position is valid within the map.
 * @param map The map data schema
 * @param position The position to check
 * @returns True if the position is valid, false otherwise
 */
export const isPositionValid = (map: MapProps, position: Position): boolean => {
  if (position.x < 0 || position.x >= map.length) {
    return false;
  }
  return position.y >= 0 && position.y < map[position.x].length;
};

/**
 * Checks if a position has been visited.
 * @param map The map data schema
 * @param x The x coordinate
 * @param y The y coordinate
 * @returns True if the position has been visited, false otherwise
 */
export const isVisited = (map: MapDataSchemaProps, x: number, y: number): boolean => {
  if (x < 0 || x >= map.visited.length) {
    return false;
  }
  if (y < 0 || y >= map.visited[x].length) {
    return false;
  }
  return map.visited[x][y];
};

/**
 * Marks a position as visited.
 * @param map The map data schema
 * @param x The x coordinate
 * @param y The y coordinate
 * @returns The updated map data schema
 */
export const markVisited = (map: MapDataSchemaProps, x: number, y: number): MapDataSchemaProps => {
  if (x < 0 || x >= map.visited.length || y < 0 || (map.visited[x] && y >= map.visited[x].length)) {
    return map;
  }
  const { grid, visited, currentPosition } = map;
  const newVisited = visited.map((row, i) => (i === x ? row.map((val, j) => (j === y ? true : val)) : [...row]));
  return { grid, visited: newVisited, currentPosition };
};

/**
 * Checks if moving vertically (y remains constant).
 * @param prevPosition The previous position
 * @param currentPosition The current position
 * @returns True if moving vertically, false otherwise
 */
export const isMovingVertically = (prevPosition: Position, currentPosition: Position): boolean =>
  prevPosition.y === currentPosition.y;

/**
 * Checks if moving horizontally (x remains constant).
 * @param prevPosition The previous position
 * @param currentPosition The current position
 * @returns True if moving horizontally, false otherwise
 */
export const isMovingHorizontally = (prevPosition: Position, currentPosition: Position): boolean =>
  prevPosition.x === currentPosition.x;

/**
 * Gets the next position moving up.
 * @param currentPosition The current position
 * @returns The next position up
 */
export const goUp = (currentPosition: Position): Position => ({
  x: currentPosition.x - 1,
  y: currentPosition.y,
});

/**
 * Gets the next position moving down.
 * @param currentPosition The current position
 * @returns The next position down
 */
export const goDown = (currentPosition: Position): Position => ({
  x: currentPosition.x + 1,
  y: currentPosition.y,
});

/**
 * Gets the next position moving left.
 * @param currentPosition The current position
 * @returns The next position to the left
 */
export const goLeft = (currentPosition: Position): Position => ({
  x: currentPosition.x,
  y: currentPosition.y - 1,
});

/**
 * Gets the next position moving right.
 * @param currentPosition The current position
 * @returns The next position to the right
 */
export const goRight = (currentPosition: Position): Position => ({
  x: currentPosition.x,
  y: currentPosition.y + 1,
});

/**
 * Checks if there are valid perpendicular moves from the current path.
 * @param map The map data schema
 * @param prevPosition The previous position
 * @returns True if there are valid perpendicular moves, false otherwise
 */
export const hasMovesLeftAndRight = (map: MapDataSchemaProps, prevPosition: Position): boolean => {
  const { currentPosition, grid } = map;
  if (isMovingVertically(prevPosition, currentPosition)) {
    const leftPos = goLeft(currentPosition);
    const rightPos = goRight(currentPosition);
    return [leftPos, rightPos].some((pos) => {
      if (!isPositionValid(grid, pos)) return false;
      const char = getChar({ map: grid, row: pos.x, col: pos.y });
      return char !== null && char !== " ";
    });
  }
  if (isMovingHorizontally(prevPosition, currentPosition)) {
    const upPos = goUp(currentPosition);
    const downPos = goDown(currentPosition);
    return [upPos, downPos].some((pos) => {
      if (!isPositionValid(grid, pos)) return false;
      const char = getChar({ map: grid, row: pos.x, col: pos.y });
      return char !== null && char !== " ";
    });
  }
  return false;
};

/**
 * Checks if moving straight is available.
 * @param map The map data schema
 * @param prevPosition The previous position
 * @returns True if a straight move is available, false otherwise
 */
export const moveStraightAvailable = (map: MapDataSchemaProps, prevPosition: Position): boolean => {
  const { currentPosition, grid } = map;
  const dx = currentPosition.x - prevPosition.x;
  const dy = currentPosition.y - prevPosition.y;
  const nextPos = {
    x: currentPosition.x + dx,
    y: currentPosition.y + dy,
  };
  if (isPositionValid(grid, nextPos)) {
    const nextChar = getChar({ map: grid, row: nextPos.x, col: nextPos.y });
    return nextChar !== null && nextChar !== " ";
  }
  return false;
};

/**
 * Determines if a character is an intersection.
 * @param character The character to check
 * @returns True if the character is an intersection, false otherwise
 */
export const isIntersection = (character: string): boolean => {
  const pathChars = ["-", "|"];
  return !pathChars.includes(character);
};

/**
 * Finds the next straight move at an intersection.
 * @param map The map data schema
 * @param prevPosition The previous position
 * @returns The next position in the same direction or null if not available
 */
export const getNextStraightMove = (map: MapDataSchemaProps, prevPosition: Position): Position | null => {
  const { currentPosition, grid } = map;
  const possibleMoves = isMovingHorizontally(prevPosition, currentPosition)
    ? [
        {
          check: goRight(currentPosition),
          condition: (pos: Position) => pos.y !== prevPosition.y,
        },
        {
          check: goLeft(currentPosition),
          condition: (pos: Position) => pos.y !== prevPosition.y,
        },
      ]
    : [
        {
          check: goDown(currentPosition),
          condition: (pos: Position) => pos.x !== prevPosition.x,
        },
        {
          check: goUp(currentPosition),
          condition: (pos: Position) => pos.x !== prevPosition.x,
        },
      ];
  for (const { check, condition } of possibleMoves) {
    if (
      isPositionValid(grid, check) &&
      condition(check) &&
      getChar({ map: grid, row: check.x, col: check.y }) !== " "
    ) {
      return check;
    }
  }
  return null;
};

/**
 * Gets all four possible moves from the given position.
 * @param position The current position
 * @returns An array of positions for up, right, down, and left moves
 */
export const getMoves = (position: Position): Position[] => [
  goUp(position),
  goRight(position),
  goDown(position),
  goLeft(position),
];
