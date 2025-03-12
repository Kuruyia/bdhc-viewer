import { Table, useMantineTheme } from "@mantine/core";
import * as React from "react";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";

export type BDHCHeightsTableProps = {
  heights: number[];
  selectedPlates?: BDHCPlate[];
};

const BDHCHeightsTable: React.FC<BDHCHeightsTableProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();

  const rows = props.heights.map((elem, index) => {
    const isPlateSelected = props.selectedPlates?.some(
      (plate) => plate.height === elem,
    );

    return (
      <Table.Tr
        key={index}
        bg={isPlateSelected ? theme.colors.violet[9] : undefined}
        c={isPlateSelected ? theme.white : undefined}
      >
        <Table.Td style={{ fontWeight: "bold" }}>{index}</Table.Td>
        <Table.Td>{elem}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table verticalSpacing="sm" striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>Height</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BDHCHeightsTable;
