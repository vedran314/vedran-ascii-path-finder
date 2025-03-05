import { input1, input2, input3, input4, input5, input6, input7, input8, input9 } from "../lib/input-maps";
import { invalidInput7 } from "../lib/invalid-input-maps";
import { createMap } from "../utils/map/map-utils";
import { createPathWalkerState, findStartAndEndPositions } from "../utils/path/path-utils";

import { solveMap, walkPath } from "./path-walker";

describe("Path Walker", () => {
  describe("findStartAndEndPositions", () => {
    it("should find start and end positions in a basic map", () => {
      const mapData = createMap(input1);

      const { startPosition, endPosition } = findStartAndEndPositions(mapData);
      expect(startPosition).toEqual({ x: 0, y: 0 });
      expect(endPosition).toEqual({ x: 2, y: 0 });
    });

    it("should find start and end positions in a complex map", () => {
      const mapData = createMap(input4); // GOONIES map

      const { startPosition, endPosition } = findStartAndEndPositions(mapData);
      expect(startPosition).toEqual({ x: 3, y: 1 });
      expect(endPosition).toEqual({ x: 7, y: 13 });
    });
  });

  describe("createPathWalkerState", () => {
    it("should initialize with a valid map", () => {
      const mapData = createMap(input1);

      const state = createPathWalkerState(mapData);
      expect(state).toBeDefined();
      expect(state.collectedLetters).toBe("");
      expect(state.pathCharacters).toBe("@");
      expect(state.isComplete).toBe(false);
      expect(state.isStuck).toBe(false);
    });

    it("should throw an error if no start position is found", () => {
      // Create a map without a start position
      const invalidMap = [
        [" ", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
      ];
      const mapData = createMap(invalidMap);

      expect(() => createPathWalkerState(mapData)).toThrow("No start position found in the map");
    });

    it("should throw an error if no end position is found", () => {
      // Create a map without an end position
      const invalidMap = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", "-", "B", "-", "+", " ", " ", " ", "C"],
      ];
      const mapData = createMap(invalidMap);

      expect(() => createPathWalkerState(mapData)).toThrow("No end position found in the map");
    });
  });

  describe("walkPath", () => {
    it("should collect letters along a simple horizontal path (input7)", () => {
      const mapData = createMap(input7);
      const initialState = createPathWalkerState(mapData);
      const finalState = walkPath(initialState);

      expect(finalState.collectedLetters).toBe("A");
      expect(finalState.pathCharacters).toBe("@-A-x");
      expect(finalState.isComplete).toBe(true);
      expect(finalState.isStuck).toBe(false);
    });

    it("should collect letters along a simple vertical path (input8)", () => {
      const mapData = createMap(input8);
      const initialState = createPathWalkerState(mapData);
      const finalState = walkPath(initialState);

      expect(finalState.collectedLetters).toBe("A");
      expect(finalState.pathCharacters).toBe("@|A|x");
      expect(finalState.isComplete).toBe(true);
      expect(finalState.isStuck).toBe(false);
    });

    it("should handle intersections correctly (input1)", () => {
      const mapData = createMap(input1);
      const initialState = createPathWalkerState(mapData);
      const finalState = walkPath(initialState);

      expect(finalState.collectedLetters).toBe("ACB");
      expect(finalState.isComplete).toBe(true);
      expect(finalState.isStuck).toBe(false);
    });

    it("should go straight through intersections (input2)", () => {
      const mapData = createMap(input2);
      const initialState = createPathWalkerState(mapData);
      const finalState = walkPath(initialState);

      expect(finalState.collectedLetters).toBe("ABCD");
      expect(finalState.isComplete).toBe(true);
      expect(finalState.isStuck).toBe(false);
    });

    it("should not collect a letter twice (input4 - GOONIES)", () => {
      const mapData = createMap(input4);
      const initialState = createPathWalkerState(mapData);
      const finalState = walkPath(initialState);

      expect(finalState.collectedLetters).toBe("GOONIES");
      expect(finalState.isComplete).toBe(true);
      expect(finalState.isStuck).toBe(false);
    });

    it("should keep direction in a compact space (input5)", () => {
      const mapData = createMap(input5);
      const initialState = createPathWalkerState(mapData);
      const finalState = walkPath(initialState);

      expect(finalState.collectedLetters).toBe("BLAH");
      expect(finalState.isComplete).toBe(true);
      expect(finalState.isStuck).toBe(false);
    });

    it("should ignore stuff after end of path (input6)", () => {
      const mapData = createMap(input6);
      const initialState = createPathWalkerState(mapData);
      const finalState = walkPath(initialState);

      expect(finalState.collectedLetters).toBe("AB");
      expect(finalState.pathCharacters).not.toContain("C");
      expect(finalState.pathCharacters).not.toContain("D");
      expect(finalState.isComplete).toBe(true);
      expect(finalState.isStuck).toBe(false);
    });
  });

  describe("solveMap", () => {
    it("should solve a basic map (input1)", () => {
      const result = solveMap(input1);
      expect(result?.letters).toBe("ACB");
      expect(result?.isComplete).toBe(true);
    });

    it("should solve a map with intersections (input2)", () => {
      const result = solveMap(input2);
      expect(result?.letters).toBe("ABCD");
      expect(result?.isComplete).toBe(true);
    });

    it("should solve a map with a simple path (input3)", () => {
      const result = solveMap(input3);
      expect(result?.letters).toBe("ACB");
      expect(result?.isComplete).toBe(true);
    });

    it("should solve the GOONIES map (input4)", () => {
      const result = solveMap(input4);
      expect(result?.letters).toBe("GOONIES");
      expect(result?.isComplete).toBe(true);
    });

    it("should solve a compact map (input5)", () => {
      const result = solveMap(input5);
      expect(result?.letters).toBe("BLAH");
      expect(result?.isComplete).toBe(true);
    });

    it("should ignore characters after the end (input6)", () => {
      const result = solveMap(input6);
      expect(result?.letters).toBe("AB");
      expect(result?.isComplete).toBe(true);
    });

    it("should solve a simple horizontal path (input7)", () => {
      const result = solveMap(input7);
      expect(result?.letters).toBe("A");
      expect(result?.isComplete).toBe(true);
    });

    it("should solve a simple vertical path (input8)", () => {
      const result = solveMap(input8);
      expect(result?.letters).toBe("A");
      expect(result?.isComplete).toBe(true);
    });

    it("should solve a map with extra letters at intersections (input9)", () => {
      const result = solveMap(input9);
      expect(result?.letters).toBe("ABC");
      expect(result?.isComplete).toBe(true);
    });

    it("should handle string input", () => {
      const mapString = "@-A-x";
      const result = solveMap(mapString);
      expect(result?.letters).toBe("A");
      expect(result?.isComplete).toBe(true);
    });

    it("should handle invalid maps gracefully", () => {
      // Create an invalid map without a start position
      const invalidMap = [
        [" ", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
      ];

      const result = solveMap(invalidMap);
      expect(result?.letters).toBe("");
      expect(result?.path).toBe("Error solving map");
      expect(result?.isComplete).toBe(false);
    });
  });

  it("should handle invalid maps gracefully", () => {
    // Create an invalid map without a start position
    const invalidMap = invalidInput7;

    const result = solveMap(invalidMap);
    expect(result?.letters).toBe("");
    expect(result?.path).toBe("Error solving map");
    expect(result?.isComplete).toBe(false);
  });

  describe("Edge cases", () => {
    it("should handle a map with only start and end positions", () => {
      const simpleMap = [["@", "-", "x"]];
      const result = solveMap(simpleMap);

      expect(result?.letters).toBe("");
      expect(result?.path).toBe("@-x");
      expect(result?.isComplete).toBe(true);
    });

    it("should handle a map with multiple possible paths but follow the correct one", () => {
      const multiPathMap = [
        ["@", "-", "A", "-", "+", "-", "B", "-", "x"],
        [" ", " ", " ", " ", "|", " ", " ", " ", " "],
        [" ", " ", " ", " ", "C", "-", "D", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "E"],
      ];

      const result = solveMap(multiPathMap);
      expect(result?.letters).toBe("AB");
      expect(result?.isComplete).toBe(true);
    });
  });
});
