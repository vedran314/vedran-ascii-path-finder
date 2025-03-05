"use client";
import { useState } from "react";

import { CardCompact } from "@/components/card-compact";
import { CodeBlock } from "@/components/code-block";
import { PathWalkerResultProps } from "@/utils/path/path-utils";
import { MapItemWithEventsProps, MapProps } from "@/utils/types/types";

import { Button } from "../../components/ui/button";
import { validateMap } from "../actions/validate-map-item";

const MapItem = ({ id, input, name, description, isSelected, handleOnClick }: MapItemWithEventsProps) => {
  const formatMap = (inputMap: MapProps): string =>
    Array.isArray(inputMap)
      ? inputMap.map((row) => row.map((cell) => (cell === " " ? "·" : cell)).join("")).join("\n")
      : "";

  return (
    <CardCompact
      id={id}
      title={name}
      description={description}
      content={<CodeBlock code={formatMap(input)} />}
      handleOnClick={() => (handleOnClick ? handleOnClick(id) : undefined)}
      className={`cursor-pointer w-full transition-border duration-300 ${
        isSelected
          ? "border border-gray-900 shadow-xs dark:border-yellow-500"
          : "border border-gray-300 dark:border-gray-800"
      }`}
    />
  );
};

const MapGrid = ({ maps }: { maps: MapItemWithEventsProps[] }) => {
  const [selectedMapId, setSelectedMapId] = useState("id-1");
  const [validationResult, setValidationResult] = useState<PathWalkerResultProps>();

  const handleSelectMap = (id: string) => {
    setSelectedMapId((prevId) => (prevId === id ? "" : id));
  };

  // Handle validation by finding the selected map and invoking the server action
  const handleValidate = async () => {
    if (!selectedMapId) return;

    const selectedMap = maps.find((map) => map.id === selectedMapId);
    if (selectedMap) {
      try {
        const result = await validateMap(selectedMap.input);
        setValidationResult(result ?? undefined);
      } catch (error) {
        setValidationResult({ letters: "", path: "", isComplete: false });
      }
    }
  };

  return (
    <div className="relative">
      {validationResult && (
        <div className="text-lg mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 mb-10">
          <h2 className=" text-gray-600 dark:text-gray-400">Validation Result</h2>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Letters Collected: {validationResult.letters}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200">Path: {validationResult.path}</p>
          <p
            className={`text-sm ${validationResult.isComplete ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {validationResult.isComplete
              ? "Map is valid, and path letters are successfully collected."
              : "Map is invalid, and path letters are not collected."}
          </p>
        </div>
      )}
      <div className="grid ms-center grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {maps.map((map) => (
          <div key={map.id}>
            <MapItem
              id={map.id}
              input={map.input}
              name={map.name}
              description={map.description}
              isSelected={selectedMapId === map.id}
              handleOnClick={() => handleSelectMap(map.id)}
            />
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-black p-4 w-full fixed bottom-0 left-0">
        <Button className="w-full dark:bg-yellow-500 dark:hover:bg-yellow-600" onClick={handleValidate}>
          Validate
        </Button>
      </div>
    </div>
  );
};

export { MapGrid };
