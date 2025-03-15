import { Table, useMantineTheme } from "@mantine/core";
import * as React from "react";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";
import { BDHCPoint } from "../../data/bdhc/BDHCPoint.ts";

export type BDHCPointsTableProps = {
  points: BDHCPoint[];
  selectedPlates?: BDHCPlate[];
};

const BDHCPointsTable: React.FC<BDHCPointsTableProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();

  const rows = props.points.map((elem, index) => {
    const isPlateSelected = props.selectedPlates?.some(
      (plate) => plate.firstPoint === elem || plate.secondPoint === elem,
    );

    return (
      <Table.Tr
        key={index}
        bg={isPlateSelected ? theme.colors.violet[9] : undefined}
        c={isPlateSelected ? theme.white : undefined}
      >
        <Table.Td style={{ fontWeight: "bold" }}>{index}</Table.Td>
        <Table.Td>{elem.x}</Table.Td>
        <Table.Td>{elem.z}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table verticalSpacing="sm" striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>X</Table.Th>
          <Table.Th>Z</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BDHCPointsTable;
