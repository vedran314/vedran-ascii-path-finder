import { isLetter, isPathChar, isValidChar } from "./character-utils";

describe("Character Utils", () => {
  describe("isPathChar", () => {
    it("should identify valid path characters", () => {
      expect(isPathChar("-")).toBe(true);
      expect(isPathChar("|")).toBe(true);
      expect(isPathChar("+")).toBe(true);
    });

    it("should reject non-path characters", () => {
      expect(isPathChar("@")).toBe(false);
      expect(isPathChar("x")).toBe(false);
      expect(isPathChar("A")).toBe(false);
      expect(isPathChar(" ")).toBe(false);
    });
  });

  describe("isLetter", () => {
    it("should identify uppercase letters", () => {
      expect(isLetter("A")).toBe(true);
      expect(isLetter("Z")).toBe(true);
      expect(isLetter("M")).toBe(true);
    });

    it("should reject non-letter characters", () => {
      expect(isLetter("a")).toBe(false); // Lowercase
      expect(isLetter("1")).toBe(false); // Number
      expect(isLetter("@")).toBe(false); // Symbol
      expect(isLetter("-")).toBe(false); // Path character
      expect(isLetter(" ")).toBe(false); // Space
    });
  });

  describe("isValidChar", () => {
    it("should identify valid map characters", () => {
      // Path characters
      expect(isValidChar("-")).toBe(true);
      expect(isValidChar("|")).toBe(true);
      expect(isValidChar("+")).toBe(true);

      // Special characters
      expect(isValidChar("@")).toBe(true);
      expect(isValidChar("x")).toBe(true);
      expect(isValidChar(" ")).toBe(true);

      // Letters
      expect(isValidChar("A")).toBe(true);
      expect(isValidChar("Z")).toBe(true);
    });

    it("should reject invalid map characters", () => {
      expect(isValidChar("a")).toBe(false); // Lowercase
      expect(isValidChar("1")).toBe(false); // Number
      expect(isValidChar("?")).toBe(false); // Symbol
      expect(isValidChar("/")).toBe(false); // Other symbol
    });
  });
});
