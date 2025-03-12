import { Vec2D } from "./data/Vec2D.ts";
import { Vec3D } from "./data/Vec3D.ts";

export const fx32ToFloat = (value: number) => {
  return value / (1 << 12);
};

export const floatToFx32 = (value: number) => {
  if (value > 0) {
    return Math.ceil(value * (1 << 12));
  } else {
    return Math.floor(value * (1 << 12));
  }
};

export const calculateHeight = (
  slope: Vec3D,
  height: number,
  objectPosition: Vec2D,
) => {
  let res = -(slope.x * objectPosition.x + slope.z * objectPosition.y + height);
  res /= slope.y;

  // Intentional loss of precision to try being closer to what the game would actually calculate
  return fx32ToFloat(floatToFx32(res));
};
