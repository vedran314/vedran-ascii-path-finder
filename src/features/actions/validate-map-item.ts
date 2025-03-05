"use server";
import { MapProps } from "../../utils/types/types";
import { solveMap } from "../../validators/path-walker";

const validateMap = async (map: MapProps) => {
  try {
    const result = await solveMap(map);
    return result; // return the validation result
  } catch (error) {
    throw new Error("Map validation failed");
  }
};
export { validateMap };
