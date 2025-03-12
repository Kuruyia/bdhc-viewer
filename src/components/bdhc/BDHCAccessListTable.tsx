import { Table, useMantineTheme } from "@mantine/core";
import * as React from "react";

import { BDHCStrip } from "../../data/bdhc/BDHCStrip.ts";

export type BDHCAccessListTableProps = {
  accessList: number[];
  selectedStrip?: BDHCStrip | null;
};

const BDHCAccessListTable: React.FC<BDHCAccessListTableProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();

  const rows = props.accessList.map((elem, index) => {
    const isStripSelected =
      props.selectedStrip &&
      index >= props.selectedStrip.accessListStartIndex &&
      index < props.selectedStrip.accessListEndIndex;

    return (
      <Table.Tr
        key={index}
        bg={isStripSelected ? theme.colors.violet[9] : undefined}
        c={isStripSelected ? theme.white : undefined}
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
          <Table.Th>Plate #</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BDHCAccessListTable;
