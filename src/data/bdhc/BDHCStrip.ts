import { BDHCPlate } from "./BDHCPlate.ts";

export type BDHCStrip = {
  lowerBound: number;
  accessListElementCount: number;
  accessListStartIndex: number;

  plates: BDHCPlate[];
  accessListEndIndex: number;
};
