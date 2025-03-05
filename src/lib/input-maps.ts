/**
 * Map Characters Explanation:
 * "@" - Start: The unique entry point of the path. There must be exactly one "@" in the map.
 * "+" - Turn: Indicates an intersection or a turn where the path changes direction.
 * "-" - Horizontal segment: A valid part of the path that connects characters horizontally.
 * "|" - Vertical segment: A valid part of the path that connects characters vertically.
 * " " - Space: Represents an empty area where no path exists.
 * Letters (A-Z): Collectible items along the path.
 * "x" - End: The endpoint of the path.
 */
import { MapItemProps } from "../utils/types/types";

// 1. Basic Example
export const input1: string[][] = [
  ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
  ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
  [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
  [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
];

// 2. Go Straight Through Intersections
export const input2: string[][] = [
  [" ", " ", "@"],
  [" ", " ", "|", " ", "+", "-", "C", "-", "-", "+"],
  [" ", " ", "A", " ", "|", " ", " ", " ", " ", "|"],
  [" ", " ", "+", "-", "-", "-", "B", "-", "-", "+"],
  [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
  [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", " ", "+", "-", "-", "-", "D", "-", "-", "+"],
];

export const input3: string[][] = [
  ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
  ["x", "-", "B", "-", "+", " ", " ", " ", "|"],
  [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
  [" ", " ", " ", " ", "+", "-", "-", "-", "C"],
];

// 4. Do Not Collect a Letter Twice (GOONIES)
export const input4: string[][] = [
  [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
  [" ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
  [" ", "@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
  [" ", " ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
  [" ", " ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
];

// 5. Keep Direction, Even in a Compact Space

export const input5: string[][] = [
  [" ", "+", "-", "L", "-", "+"],
  [" ", "|", " ", " ", "+", "A", "-", "+"],
  ["@", "B", "+", " ", "+", "+", " ", "H"],
  [" ", "+", "+", " ", " ", " ", " ", "x"],
];

// 6. Ignore Stuff After End of Path
export const input6: string[][] = [
  [" ", " ", "@", "-", "A", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
];

// 7. Simple Horizontal Path with One Letter
export const input7: string[][] = [["@", "-", "A", "-", "x"]];

// 8. Simple Vertical Path
export const input8: string[][] = [["@"], ["|"], ["A"], ["|"], ["x"]];

// 9. Intersection with Extra Letters
export const input9: string[][] = [
  [" ", " ", " ", "@", "-", "-", "-", "A", "-", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", "+", "-", "-", "-", "B", "-", "-", "-", "+"],
  [" ", " ", " ", "|", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", "C", "-", "-", "-", "-", "-", "-", "x"],
];

// all inputs, and their descriptions
export const fakeMapDb: MapItemProps[] = [
  {
    input: input1,
    id: "id-1",
    name: "Basic",
    description: "Just a basic example.",
  },
  {
    input: input2,
    id: "id-2",
    name: "Go Straight",
    description: "Go Straight Through Intersections.",
  },
  {
    input: input3,
    id: "id-3",
    name: "Simple",
    description: "Simple Horizontal Path with One Letter.",
  },
  {
    input: input4,
    id: "id-4",
    name: "Goonies",
    description: "Do Not Collect a Letter Twice (GOONIES).",
  },
  {
    input: input5,
    id: "id-5",
    name: "Compact Map",
    description: "Keep Direction, Even in a Compact Space.",
  },
  {
    input: input6,
    id: "id-6",
    name: "Ignored",
    description: "Ignore Stuff After End of Path.",
  },
  {
    input: input7,
    id: "id-7",
    name: "Simple Horizontal",
    description: "Simple Horizontal Path with One Letter.",
  },
  {
    input: input8,
    id: "id-8",
    name: "Simple Vertical",
    description: "Simple Vertical Path.",
  },
  {
    input: input9,
    id: "id-9",
    name: "Intersection",
    description: "Intersection with Extra Letters.",
  },
];
