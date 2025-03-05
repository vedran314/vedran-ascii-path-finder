import { createMap } from "../utils/map/map-utils";
import {
  createPathWalkerState,
  findNextMove,
  makeMove,
  PathWalkerResultProps,
  PathWalkerStateProps,
} from "../utils/path/path-utils";
import { MapDataSchemaProps, MapProps, Position } from "../utils/types/types";

import { validateMap } from "./map-validator";

/**
 * Walks the path in the map
 * @param initialState The initial path walker state
 * @returns The final state after walking the path
 */
export const walkPath = (initialState: PathWalkerStateProps): PathWalkerStateProps => {
  let currentState = initialState;

  while (!currentState.isComplete && !currentState.isStuck) {
    const nextPosition = findNextMove(currentState);

    if (nextPosition) {
      currentState = makeMove(currentState, nextPosition);
    } else {
      currentState = {
        ...currentState,
        isStuck: true,
      };
    }
  }

  return currentState;
};

/**
 * Solves a map by walking the path and collecting letters
 * @param mapData The map data
 * @returns The result of the path walking process
 */
export const solveMap = (mapData: MapDataSchemaProps | MapProps | string): PathWalkerResultProps | null => {
  try {
    // Convert input to MapDataSchemaProps if needed
    // validate map first
    let processedMapData: MapDataSchemaProps;

    if (typeof mapData === "string") {
      const grid = mapData.split("\n").map((line) => line.split(""));
      processedMapData = createMap(grid);
    } else if (Array.isArray(mapData) && mapData.length > 0 && Array.isArray(mapData[0])) {
      // Input is already a grid
      processedMapData = createMap(mapData as MapProps);
    } else {
      // Input is already MapDataSchemaProps
      processedMapData = mapData as MapDataSchemaProps;
    }

    const isMapValid = validateMap(processedMapData.grid);

    // Handle invalid map case according to test expectations
    if (!isMapValid.isValid) {
      return {
        letters: "",
        path: "Error solving map",
        isComplete: false,
      };
    }

    const initialState = createPathWalkerState(processedMapData);
    const finalState = walkPath(initialState);

    return {
      letters: finalState.collectedLetters,
      path: finalState.pathCharacters,
      isComplete: finalState.isComplete,
    };
  } catch (error) {
    return {
      letters: "",
      path: "Error solving map",
      isComplete: false,
    };
  }
};
