export type MapProps = string[][];
export type Position = { x: number; y: number };

export type GetCharProps = {
  map: MapProps;
  row: number;
  col: number;
};

export type MapDataSchemaProps = {
  grid: MapProps;
  visited: boolean[][];
  currentPosition: Position;
};

export type FindSymbolsProps = {
  map: MapProps;
  symbol: string;
};

export type MapItemProps = {
  id: string;
  input: MapProps;
  name: string;
  description: string;
};

export type MapItemWithEventsProps = MapItemProps & {
  isSelected?: boolean;
  handleOnClick?: (id: string) => void;
};
