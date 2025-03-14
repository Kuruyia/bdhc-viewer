import { Table, useMantineTheme } from "@mantine/core";
import * as React from "react";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";

export type BDHCConstantsTableProps = {
  constants: number[];
  selectedPlates?: BDHCPlate[];
};

const BDHCConstantsTable: React.FC<BDHCConstantsTableProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();

  const rows = props.constants.map((elem, index) => {
    const isPlateSelected = props.selectedPlates?.some(
      (plate) => plate.constant === elem,
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
          <Table.Th>Constant</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BDHCConstantsTable;
