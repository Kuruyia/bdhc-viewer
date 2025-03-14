import { Vec2D } from "../Vec2D.ts";
import { Vec3D } from "../Vec3D.ts";
import { BDHCPoint } from "./BDHCPoint.ts";

export type BDHCPlate = {
  firstPointIndex: number;
  secondPointIndex: number;
  normalIndex: number;
  constantIndex: number;

  index: number;
  firstPoint: BDHCPoint;
  secondPoint: BDHCPoint;
  normal: Vec3D;
  constant: number;
  size: Vec2D;
};
