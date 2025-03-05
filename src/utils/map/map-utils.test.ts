import { MapDataSchemaProps, Position } from "../types/types";

import {
  createMap,
  findSymbols,
  getChar,
  getMoves,
  getNextStraightMove,
  goDown,
  goLeft,
  goRight,
  goUp,
  hasMovesLeftAndRight,
  isIntersection,
  isMovingHorizontally,
  isMovingVertically,
  isPositionValid,
  isVisited,
  markVisited,
  moveStraightAvailable,
} from "./map-utils";

describe("Map Utils", () => {
  // Sample map for testing
  const sampleGrid = [
    [" ", " ", "@", "-", "-", "A", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", "x", "-", "B", "-", "+", "C"],
    [" ", " ", " ", " ", " ", " ", "|", " "],
    [" ", " ", " ", " ", " ", " ", "+", "-", "-", "+"],
  ];

  describe("createMap", () => {
    it("should create a map with the correct structure", () => {
      const map = createMap(sampleGrid);

      expect(map).toHaveProperty("grid");
      expect(map).toHaveProperty("visited");
      expect(map).toHaveProperty("currentPosition");
      expect(map.currentPosition).toEqual({ x: 0, y: 0 });
      expect(map.grid).toEqual(sampleGrid);
      expect(map.visited.length).toBe(sampleGrid.length);
      expect(map.visited[0].length).toBe(sampleGrid[0].length);

      // Check that all visited positions are initialized to false
      map.visited.forEach((row) => {
        row.forEach((cell) => {
          expect(cell).toBe(false);
        });
      });
    });
  });

  describe("findSymbols", () => {
    it("should find the start symbol", () => {
      const symbols = findSymbols({ map: sampleGrid, symbol: "@" });
      expect(symbols).toEqual([{ x: 0, y: 2 }]);
    });

    it("should find the end symbol", () => {
      const symbols = findSymbols({ map: sampleGrid, symbol: "x" });
      expect(symbols).toEqual([{ x: 2, y: 2 }]);
    });

    it("should find multiple symbols if they exist", () => {
      // Create a grid with multiple 'A' symbols
      const multipleSymbolsGrid = [
        ["A", " ", "A"],
        [" ", "A", " "],
      ];

      const symbols = findSymbols({ map: multipleSymbolsGrid, symbol: "A" });
      expect(symbols).toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
      ]);
    });

    it("should return null if symbol is not found", () => {
      const symbols = findSymbols({ map: sampleGrid, symbol: "Z" });
      expect(symbols).toBeNull();
    });
  });

  describe("getChar", () => {
    it("should return the character at a valid position", () => {
      expect(getChar({ map: sampleGrid, row: 0, col: 2 })).toBe("@");
      expect(getChar({ map: sampleGrid, row: 0, col: 5 })).toBe("A");
      expect(getChar({ map: sampleGrid, row: 2, col: 2 })).toBe("x");
    });

    it("should return null for invalid positions", () => {
      expect(getChar({ map: sampleGrid, row: -1, col: 0 })).toBeNull();
      expect(getChar({ map: sampleGrid, row: 0, col: -1 })).toBeNull();
      expect(getChar({ map: sampleGrid, row: 10, col: 0 })).toBeNull();
      expect(getChar({ map: sampleGrid, row: 0, col: 20 })).toBeNull();
    });
  });

  describe("isPositionValid", () => {
    it("should return true for valid positions", () => {
      expect(isPositionValid(sampleGrid, { x: 0, y: 0 })).toBe(true);
      expect(isPositionValid(sampleGrid, { x: 4, y: 9 })).toBe(true);
    });

    it("should return false for invalid positions", () => {
      expect(isPositionValid(sampleGrid, { x: -1, y: 0 })).toBe(false);
      expect(isPositionValid(sampleGrid, { x: 0, y: -1 })).toBe(false);
      expect(isPositionValid(sampleGrid, { x: 10, y: 0 })).toBe(false);
      expect(isPositionValid(sampleGrid, { x: 0, y: 20 })).toBe(false);
    });
  });

  describe("isVisited and markVisited", () => {
    let map: MapDataSchemaProps;

    beforeEach(() => {
      map = createMap(sampleGrid);
    });

    it("should correctly check if a position is visited", () => {
      expect(isVisited(map, 0, 0)).toBe(false);

      // Mark as visited
      const updatedMap = markVisited(map, 0, 0);
      expect(isVisited(updatedMap, 0, 0)).toBe(true);

      // Other positions should still be unvisited
      expect(isVisited(updatedMap, 0, 1)).toBe(false);
    });

    it("should handle invalid positions gracefully", () => {
      // Marking an invalid position should return the original map
      const updatedMap = markVisited(map, -1, 0);
      expect(updatedMap).toEqual(map);

      // Checking an invalid position should return false
      expect(isVisited(map, -1, 0)).toBe(false);
    });
  });

  describe("movement detection", () => {
    it("should detect vertical movement", () => {
      expect(isMovingVertically({ x: 1, y: 3 }, { x: 2, y: 3 })).toBe(true);
      expect(isMovingVertically({ x: 1, y: 3 }, { x: 1, y: 4 })).toBe(false);
    });

    it("should detect horizontal movement", () => {
      expect(isMovingHorizontally({ x: 1, y: 3 }, { x: 1, y: 4 })).toBe(true);
      expect(isMovingHorizontally({ x: 1, y: 3 }, { x: 2, y: 3 })).toBe(false);
    });
  });

  describe("movement functions", () => {
    const pos: Position = { x: 2, y: 3 };

    it("should calculate the position when moving up", () => {
      expect(goUp(pos)).toEqual({ x: 1, y: 3 });
    });

    it("should calculate the position when moving down", () => {
      expect(goDown(pos)).toEqual({ x: 3, y: 3 });
    });

    it("should calculate the position when moving left", () => {
      expect(goLeft(pos)).toEqual({ x: 2, y: 2 });
    });

    it("should calculate the position when moving right", () => {
      expect(goRight(pos)).toEqual({ x: 2, y: 4 });
    });

    it("should return all possible moves", () => {
      const moves = getMoves(pos);
      expect(moves).toContainEqual({ x: 1, y: 3 }); // Up
      expect(moves).toContainEqual({ x: 2, y: 4 }); // Right
      expect(moves).toContainEqual({ x: 3, y: 3 }); // Down
      expect(moves).toContainEqual({ x: 2, y: 2 }); // Left
      expect(moves.length).toBe(4);
    });
  });

  describe("path validation", () => {
    let map: MapDataSchemaProps;

    beforeEach(() => {
      map = createMap([
        [" ", "-", "-", "+"],
        [" ", " ", " ", "|"],
        ["+", "-", "+", "+"],
        ["|", " ", "|", " "],
        ["+", "-", "+", " "],
      ]);
      map.currentPosition = { x: 2, y: 2 }; // Position at the '+' in the middle
    });

    it("should detect if there are moves left and right", () => {
      // When moving vertically
      expect(hasMovesLeftAndRight(map, { x: 1, y: 2 })).toBe(true);

      // When moving horizontally
      expect(hasMovesLeftAndRight(map, { x: 2, y: 1 })).toBe(true);
    });

    it("should detect if moving straight is available", () => {
      // When at an intersection with paths in both directions
      expect(moveStraightAvailable(map, { x: 2, y: 0 })).toBe(false);

      // Update map to have a straight path
      // the symbol at (2, 1) is a '-'
      const straightMap = createMap([
        [" ", "-", "-", "-"],
        [" ", " ", " ", " "],
        [" ", "-", "-", "-"],
      ]);
      straightMap.currentPosition = { x: 2, y: 1 };
      expect(moveStraightAvailable(straightMap, { x: 2, y: 2 })).toBe(false);
    });
  });

  describe("intersection handling", () => {
    it("should identify intersections", () => {
      expect(isIntersection("+")).toBe(true);
      expect(isIntersection("A")).toBe(true);
      expect(isIntersection("-")).toBe(false);
      expect(isIntersection("|")).toBe(false);
    });

    it("should find the next straight move at an intersection", () => {
      const map = createMap([
        [" ", " ", " ", " ", " "],
        [" ", "+", "-", "-", "+"],
        [" ", "|", " ", " ", "|"],
        [" ", "+", "-", "-", "+"],
      ]);
      map.currentPosition = { x: 1, y: 1 }; // Position at the top-left '+'

      // When moving horizontally
      const nextMoveHorizontal = getNextStraightMove(map, { x: 1, y: 0 });
      expect(nextMoveHorizontal).toEqual({ x: 1, y: 2 });

      // When moving vertically
      map.currentPosition = { x: 1, y: 1 };
      const nextMoveVertical = getNextStraightMove(map, { x: 0, y: 1 });
      expect(nextMoveVertical).toEqual({ x: 2, y: 1 });
    });
  });
});
