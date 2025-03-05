// just a simulation of a getting a maps from an API
import { fakeMapDb } from "@/lib/input-maps";
import { MapItemProps } from "@/utils/types/types";

export const getMaps = async (): Promise<MapItemProps[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return new Promise((resolve) => {
    resolve(fakeMapDb);
  });
};
