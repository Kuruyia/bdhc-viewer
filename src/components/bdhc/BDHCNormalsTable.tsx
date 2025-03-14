import { Table, useMantineTheme } from "@mantine/core";
import * as React from "react";

import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";
import { Vec3D } from "../../data/Vec3D.ts";

export type BDHCNormalsTableProps = {
  normals: Vec3D[];
  selectedPlates?: BDHCPlate[];
};

const BDHCNormalsTable: React.FC<BDHCNormalsTableProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();

  const rows = props.normals.map((elem, index) => {
    const isPlateSelected = props.selectedPlates?.some(
      (plate) => plate.normal === elem,
    );

    return (
      <Table.Tr
        key={index}
        bg={isPlateSelected ? theme.colors.violet[9] : undefined}
        c={isPlateSelected ? theme.white : undefined}
      >
        <Table.Td style={{ fontWeight: "bold" }}>{index}</Table.Td>
        <Table.Td>{elem.x}</Table.Td>
        <Table.Td>{elem.y}</Table.Td>
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
          <Table.Th>Y</Table.Th>
          <Table.Th>Z</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BDHCNormalsTable;
