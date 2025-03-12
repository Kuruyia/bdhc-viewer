import {
  Button,
  ComboboxItem,
  NativeSelect,
  NumberInput,
  Text,
} from "@mantine/core";
import { useMemo, useState } from "react";
import * as React from "react";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";
import { Vec2D } from "../../data/Vec2D.ts";
import { Vec3D } from "../../data/Vec3D.ts";
import { calculateHeight } from "../../utils.ts";

const SelectCustomValue = "custom";

export type BDHCHeightCalcTableProps = {
  plates: BDHCPlate[];
  selectedPlates: BDHCPlate[];
};

const BDHCHeightCalculator: React.FC<BDHCHeightCalcTableProps> = (props) => {
  // State
  const [selectedPlateValue, setSelectedPlateValue] =
    useState<string>(SelectCustomValue);
  const [slope, setSlope] = useState<Vec3D>({ x: 0, y: 0, z: 0 });
  const [height, setHeight] = useState<number>(0);
  const [objectPosition, setObjectPosition] = useState<Vec2D>({
    x: 0,
    y: 0,
  });
  const [result, setResult] = useState<number | undefined>(undefined);

  const selectData = useMemo(() => {
    return [
      {
        label: "Custom",
        value: SelectCustomValue,
      },
      ...props.plates.map((elem) => {
        let label = `Plate ${elem.index}`;
        if (props.selectedPlates.includes(elem)) {
          label += " (selected)";
        }

        return {
          label,
          value: elem.index.toString(),
        } satisfies ComboboxItem;
      }),
    ];
  }, [props.plates, props.selectedPlates]);

  const selectedPlate = useMemo(() => {
    if (selectedPlateValue === SelectCustomValue) {
      return null;
    }

    return props.plates.find(
      (elem) => elem.index === parseInt(selectedPlateValue),
    );
  }, [props.plates, selectedPlateValue]);

  // Handlers
  const handleSelectChange = (value: string) => {
    if (value === SelectCustomValue) {
      setSelectedPlateValue(value);
      return;
    }

    const plate = props.plates.find((elem) => elem.index === parseInt(value));

    if (plate) {
      setSelectedPlateValue(value);
      setSlope(plate.slope);
      setHeight(plate.height);
    }
  };

  const handleSlopeXChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    setSelectedPlateValue(SelectCustomValue);
    setSlope((prev) => ({ ...prev, x: value }));
  };

  const handleSlopeYChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    setSelectedPlateValue(SelectCustomValue);
    setSlope((prev) => ({ ...prev, y: value }));
  };

  const handleSlopeZChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    setSelectedPlateValue(SelectCustomValue);
    setSlope((prev) => ({ ...prev, z: value }));
  };

  const handleHeightChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    setSelectedPlateValue(SelectCustomValue);
    setHeight(value);
  };

  const handleObjectPositionXChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    setObjectPosition((prev) => ({ ...prev, x: value }));
  };

  const handleObjectPositionYChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }

    setObjectPosition((prev) => ({ ...prev, y: value }));
  };

  const handleCalculate = () => {
    setResult(calculateHeight(slope, height, objectPosition));
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}
      >
        <Text>Copy parameters from a plate:</Text>
        <NativeSelect
          value={selectedPlateValue}
          onChange={(event) => handleSelectChange(event.currentTarget.value)}
          data={selectData}
        />

        {selectedPlate && (
          <Text c="dimmed" mt={4}>
            Plate points: ({selectedPlate.firstPoint.x},{" "}
            {selectedPlate.firstPoint.y}) → ({selectedPlate.secondPoint.x},{" "}
            {selectedPlate.secondPoint.y})
          </Text>
        )}
      </div>

      <div style={{ display: "flex", marginBottom: 64 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 4,
          }}
        >
          <Text fw={600}>Slope</Text>
          <NumberInput
            placeholder="X"
            description="X"
            value={slope.x}
            onChange={(v) =>
              handleSlopeXChange(typeof v == "string" ? parseFloat(v) : v)
            }
            hideControls
          />
          <NumberInput
            placeholder="Y"
            description="Y"
            value={slope.y}
            onChange={(v) =>
              handleSlopeYChange(typeof v == "string" ? parseFloat(v) : v)
            }
            hideControls
          />
          <NumberInput
            placeholder="Z"
            description="Z"
            value={slope.z}
            onChange={(v) =>
              handleSlopeZChange(typeof v == "string" ? parseFloat(v) : v)
            }
            hideControls
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 4,
          }}
        >
          <Text fw={600}>Height</Text>
          <NumberInput
            placeholder="Height"
            description="Height"
            value={height}
            onChange={(v) =>
              handleHeightChange(typeof v == "string" ? parseFloat(v) : v)
            }
            hideControls
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 4,
          }}
        >
          <Text fw={600}>Object position</Text>
          <NumberInput
            placeholder="X"
            description="X"
            value={objectPosition.x}
            onChange={(v) =>
              handleObjectPositionXChange(
                typeof v == "string" ? parseFloat(v) : v,
              )
            }
            hideControls
          />
          <NumberInput
            placeholder="Z"
            description="Z"
            value={objectPosition.y}
            onChange={(v) =>
              handleObjectPositionYChange(
                typeof v == "string" ? parseFloat(v) : v,
              )
            }
            hideControls
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <NumberInput label="Result" value={result} hideControls readOnly />

        <Button variant="light" onClick={handleCalculate}>
          Calculate
        </Button>
      </div>
    </>
  );
};

export default BDHCHeightCalculator;
