import * as React from "react";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";
import Plate from "./Plate.tsx";

export type PlatesProps = {
  plates: BDHCPlate[];
  selectedPlates: BDHCPlate[];
  onPlateSelected?: (plate: BDHCPlate) => void;
};

const Plates: React.FC<PlatesProps> = (props) => {
  const plateComponents = props.plates.map((plate) => (
    <Plate
      key={plate.index}
      plate={plate}
      selected={props.selectedPlates.includes(plate)}
      onSelected={props.onPlateSelected}
    />
  ));

  return <>{plateComponents}</>;
};

export default Plates;
