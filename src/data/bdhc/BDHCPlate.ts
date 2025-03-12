import { Vec2D } from "../Vec2D.ts";
import { Vec3D } from "../Vec3D.ts";
import { BDHCPoint } from "./BDHCPoint.ts";

export type BDHCPlate = {
  firstPointIndex: number;
  secondPointIndex: number;
  slopeIndex: number;
  heightIndex: number;

  index: number;
  firstPoint: BDHCPoint;
  secondPoint: BDHCPoint;
  slope: Vec3D;
  height: number;
  size: Vec2D;
};
