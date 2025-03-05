import { getMaps } from "../queries/get-maps";

import { MapGrid } from "./map-item";

const MapList = async () => {
  const maps = await getMaps();

  return (
    <div className={"container mx-auto"}>
      <div className="pt-8 pb-40 gap-4 sm:pt-20">
        <MapGrid
          // TODO, need to fix this
          // @ts-ignore
          maps={maps}
        />
      </div>
    </div>
  );
};

export { MapList };
