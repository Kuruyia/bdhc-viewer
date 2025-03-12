import { useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { Edges } from "@react-three/drei";
import * as React from "react";
import { useMemo } from "react";
import { DoubleSide } from "three";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";
import { calculateHeight } from "../../utils.ts";

export type PlateProps = {
  plate: BDHCPlate;
  selected?: boolean;
  onSelected?: (plate: BDHCPlate) => void;
};

const Plate: React.FC<PlateProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme("light");

  // 3D
  const vertices = useMemo(() => {
    const topLeftPoint = props.plate.firstPoint;
    const bottomRightPoint = props.plate.secondPoint;
    const slope = props.plate.slope;
    const height = props.plate.height;

    const topRightPoint = { x: topLeftPoint.x, y: bottomRightPoint.y };
    const bottomLeftPoint = { x: bottomRightPoint.x, y: topLeftPoint.y };

    return new Float32Array([
      // v0
      topLeftPoint.x,
      calculateHeight(slope, height, topLeftPoint),
      topLeftPoint.y,
      // v1
      topRightPoint.x,
      calculateHeight(slope, height, topRightPoint),
      topRightPoint.y,
      // v2
      bottomRightPoint.x,
      calculateHeight(slope, height, bottomRightPoint),
      bottomRightPoint.y,
      // v3
      bottomLeftPoint.x,
      calculateHeight(slope, height, bottomLeftPoint),
      bottomLeftPoint.y,
    ]);
  }, [props.plate]);

  const indices = new Uint16Array([
    // t1
    0, 1, 2,
    // t2
    2, 3, 0,
  ]);

  return (
    <mesh onClick={() => props.onSelected?.(props.plate)}>
      <bufferGeometry>
        <bufferAttribute args={[vertices, 3]} attach={"attributes-position"} />
        <bufferAttribute args={[indices, 1]} attach={"index"} />
      </bufferGeometry>
      <meshBasicMaterial
        color={props.selected ? theme.colors.violet[9] : theme.colors.blue[9]}
        side={DoubleSide}
      />
      <Edges
        linewidth={2}
        scale={1}
        color={computedColorScheme === "dark" ? "white" : "black"}
        renderOrder={1}
      />
    </mesh>
  );
};

export default Plate;
