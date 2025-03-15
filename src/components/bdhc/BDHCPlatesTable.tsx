import { ActionIcon, Table, useMantineTheme } from "@mantine/core";
import { IconScanPosition } from "@tabler/icons-react";
import * as React from "react";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";

export type BDHCPlatesTableProps = {
  plates: BDHCPlate[];
  selectedPlates?: BDHCPlate[];
  onPlateSelect?: (plate: BDHCPlate) => void;
};

const BDHCPlatesTable: React.FC<BDHCPlatesTableProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();

  const rows = props.plates.map((elem) => {
    const isPlateSelected = props.selectedPlates?.includes(elem);

    return (
      <Table.Tr
        key={elem.index}
        bg={isPlateSelected ? theme.colors.violet[9] : undefined}
        c={isPlateSelected ? theme.white : undefined}
      >
        <Table.Td style={{ fontWeight: "bold" }}>{elem.index}</Table.Td>
        <Table.Td
          title={`Indexes: ${elem.firstPointIndex} → ${elem.secondPointIndex}`}
        >
          ({elem.firstPoint.x}, {elem.firstPoint.z}) → ({elem.secondPoint.x},{" "}
          {elem.secondPoint.z})
        </Table.Td>
        <Table.Td title={`Index: ${elem.normalIndex}`}>
          ({elem.normal.x}, {elem.normal.y}, {elem.normal.z})
        </Table.Td>
        <Table.Td title={`Index: ${elem.constantIndex}`}>
          {elem.constant}
        </Table.Td>
        <Table.Td
          style={{
            display: "flex",
            justifyContent: "end",
            gap: 8,
            marginRight: 8,
          }}
        >
          <ActionIcon
            variant={isPlateSelected ? "white" : "light"}
            onClick={() => props.onPlateSelect?.(elem)}
          >
            <IconScanPosition
              style={{ width: "60%", height: "60%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table verticalSpacing="sm" striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>Points</Table.Th>
          <Table.Th>Normal vector</Table.Th>
          <Table.Th>Constant</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BDHCPlatesTable;
