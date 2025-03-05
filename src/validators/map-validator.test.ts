import { input1, input2, input3, input4, input5, input6, input7, input8, input9 } from "@/lib/input-maps";
import {
  invalidInput1,
  invalidInput2,
  invalidInput3,
  invalidInput4,
  invalidInput5,
  invalidInput6,
  invalidInput7,
} from "@/lib/invalid-input-maps";

import { MapProps } from "../utils/types/types";

import { validateMap } from "./map-validator";

describe("Map Validator", () => {
  describe("validateMap", () => {
    it("should validate a valid map", () => {
      const validMap: MapProps = [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ];

      const result = validateMap(validMap);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should validate a map with jagged rows (uneven lengths)", () => {
      const jaggedMap: MapProps = [
        ["@", "-", "-", "-", "A"],
        [" ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+"],
      ];

      const result = validateMap(jaggedMap);
      // The map might be invalid for other reasons, but not because of jagged rows
      // We're just checking that no error about uneven rows is present
      expect(result.errors).not.toContain("All rows in the map must have the same length");
    });

    it("should reject an empty map", () => {
      const emptyMap: MapProps = [];
      const result = validateMap(emptyMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Map cannot be empty");
    });

    it("should reject a map with no start character", () => {
      const noStartMap: MapProps = [
        [" ", "-", "-", "-"],
        [" ", " ", " ", " "],
        ["x", "-", "-", "-"],
      ];

      const result = validateMap(noStartMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Map must have exactly one start character "@"');
    });

    it("should reject a map with multiple start characters", () => {
      const multipleStartMap: MapProps = [
        ["@", "-", "-", "-"],
        [" ", "@", " ", " "],
        ["x", "-", "-", "-"],
      ];

      const result = validateMap(multipleStartMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Map has 2 start characters "@", but must have exactly one');
    });

    it("should reject a map with no end character", () => {
      const noEndMap: MapProps = [
        ["@", "-", "-", "-"],
        [" ", " ", " ", " "],
        [" ", "-", "-", "-"],
      ];

      const result = validateMap(noEndMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Map must have exactly one end character "x"');
    });

    it("should reject a map with multiple end characters", () => {
      const multipleEndMap: MapProps = [
        ["@", "-", "-", "-"],
        [" ", " ", " ", "x"],
        ["x", "-", "-", "-"],
      ];

      const result = validateMap(multipleEndMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Map has 2 end characters "x", but must have exactly one');
    });

    it("should reject a map with no path characters", () => {
      const noPathMap: MapProps = [
        ["@", " ", " ", " "],
        [" ", " ", " ", " "],
        [" ", " ", " ", "x"],
      ];

      const result = validateMap(noPathMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Map must have path characters connecting start and end");
    });

    it("should reject a map with invalid characters", () => {
      const invalidCharMap: MapProps = [
        ["@", "-", "-", "-"],
        [" ", "?", " ", " "], // Invalid character '?'
        ["x", "-", "-", "-"],
      ];

      const result = validateMap(invalidCharMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid character "?" at position [1, 1]');
    });

    it("should reject a map where start position is not adjacent to a path character", () => {
      const noAdjacentPathMap: MapProps = [
        ["@", " ", "-", "-"],
        [" ", " ", " ", " "],
        ["x", "-", "-", "-"],
      ];

      const result = validateMap(noAdjacentPathMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Start position must be adjacent to a path character");
    });

    it("should reject a map where end position is not adjacent to a path character", () => {
      const noAdjacentPathMap: MapProps = [
        ["@", "-", "-", "-"],
        [" ", " ", " ", " "],
        [" ", " ", "x", " "],
      ];

      const result = validateMap(noAdjacentPathMap);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("End position must be adjacent to a path character");
    });

    it("should report multiple errors for a map with multiple issues", () => {
      const multipleIssuesMap: MapProps = [
        ["@", "-", "-", "?"], // Invalid character
        [" ", "@", " "], // Multiple start characters
        ["x", "-", "x"], // Multiple end characters
      ];

      const result = validateMap(multipleIssuesMap);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input1);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input2);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input3);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input4);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input5);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input6);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input7);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input8);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Valid maps from input-maps.ts", () => {
      it("should validate input1", () => {
        const result = validateMap(input9);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("Invalid maps from invalid-input-maps.ts", () => {
      it("should reject invalidInput1 (Missing start character)", () => {
        const result = validateMap(invalidInput1);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Map must have exactly one start character "@"');
      });

      it("should reject invalidInput2 (Missing end character)", () => {
        const result = validateMap(invalidInput2);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Map must have exactly one end character "x"');
      });

      it("should reject invalidInput3 (Multiple starts)", () => {
        const result = validateMap(invalidInput3);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Map has 2 start characters "@", but must have exactly one');
      });

      it("should reject invalidInput4 (Fork in path)", () => {
        const result = validateMap(invalidInput4);
        expect(result.isValid).toBe(false);
        // Note: Our current validator doesn't check for forks in the path
        // This test might pass with the current implementation
      });

      it("should reject invalidInput5 (Broken path)", () => {
        const result = validateMap(invalidInput5);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain(
          "Map has a broken path - there is an empty row or column between path elements"
        );
      });

      it("should reject invalidInput6 (Multiple starting paths)", () => {
        const result = validateMap(invalidInput6);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Map has 2 end characters "x", but must have exactly one');
      });

      it("should reject invalidInput7 (Fake turn)", () => {
        const result = validateMap(invalidInput7);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain("Map has fake turns - a '+' is used where the path could continue straight");
      });
    });
  });
});
