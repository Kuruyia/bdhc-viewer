import { Vec2D } from "../Vec2D.ts";

export type BDHCPoint = Vec2D;

export const calculateBDHCPointRectSize = (
  firstPoint: BDHCPoint,
  secondPoint: BDHCPoint,
): Vec2D => {
  return {
    x: Math.abs(firstPoint.x - secondPoint.x),
    y: Math.abs(firstPoint.y - secondPoint.y),
  };
};
