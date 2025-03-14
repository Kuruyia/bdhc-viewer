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
  normal: Vec3D,
  constant: number,
  objectPosition: Vec2D,
) => {
  let res = -(
    normal.x * objectPosition.x +
    normal.z * objectPosition.y +
    constant
  );
  res /= normal.y;

  // Intentional loss of precision to try being closer to what the game would actually calculate
  return fx32ToFloat(floatToFx32(res));
};
