import { Vec2D } from "../Vec2D.ts";

export type BDHCPoint = {
  x: number;
  z: number;
};

export const calculateBDHCPointRectSize = (
  firstPoint: BDHCPoint,
  secondPoint: BDHCPoint,
): Vec2D => {
  return {
    x: Math.abs(firstPoint.x - secondPoint.x),
    y: Math.abs(firstPoint.z - secondPoint.z),
  };
};

export const bdhcPointAsVec2D = (point: BDHCPoint): Vec2D => {
  return {
    x: point.x,
    y: point.z,
  };
};
