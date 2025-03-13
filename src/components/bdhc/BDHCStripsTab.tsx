import { ActionIcon, Modal, Table, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconExternalLink, IconScanPosition } from "@tabler/icons-react";
import * as React from "react";
import { useMemo, useState } from "react";

import { BDHCStrip } from "../../data/bdhc/BDHCStrip.ts";
import BDHCPlatesTable from "./BDHCPlatesTable.tsx";

export type BDHCStripsTableProps = {
  strips: BDHCStrip[];
  selectedStrip: BDHCStrip | null;
  onStripSelect?: (strip: BDHCStrip) => void;
};

const BDHCStripsTab: React.FC<BDHCStripsTableProps> = (props) => {
  // Hooks
  const theme = useMantineTheme();

  // State
  const [opened, { open, close }] = useDisclosure(false);
  const [modalStripIndex, setModalStripIndex] = useState<number | null>(null);

  // Computed
  const modalStrip = useMemo(() => {
    if (modalStripIndex === null) return null;
    return props.strips[modalStripIndex];
  }, [modalStripIndex, props.strips]);

  // Handlers
  const handleOpenButtonClick = (index: number) => {
    setModalStripIndex(index);
    open();
  };

  const handleModalExitTransitionEnd = () => {
    setModalStripIndex(null);
    close();
  };

  const rows = props.strips.map((elem, index) => {
    const isStripSelected = props.selectedStrip === elem;

    return (
      <Table.Tr
        key={index}
        bg={isStripSelected ? theme.colors.violet[9] : undefined}
        c={isStripSelected ? theme.white : undefined}
      >
        <Table.Td style={{ fontWeight: "bold" }}>{index}</Table.Td>
        <Table.Td>{elem.lowerBound}</Table.Td>
        <Table.Td>{elem.accessListStartIndex}</Table.Td>
        <Table.Td>{elem.accessListElementCount}</Table.Td>
        <Table.Td
          style={{
            display: "flex",
            justifyContent: "end",
            gap: 8,
            marginRight: 8,
          }}
        >
          <ActionIcon
            variant={isStripSelected ? "white" : "light"}
            onClick={() => props.onStripSelect?.(elem)}
          >
            <IconScanPosition
              style={{ width: "60%", height: "60%" }}
              stroke={1.5}
            />
          </ActionIcon>

          <ActionIcon
            variant={isStripSelected ? "white" : "light"}
            onClick={() => handleOpenButtonClick(index)}
          >
            <IconExternalLink
              style={{ width: "60%", height: "60%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        onExitTransitionEnd={handleModalExitTransitionEnd}
        title={`Plates for strip #${modalStripIndex}`}
        centered
        size="70rem"
      >
        {modalStrip ? <BDHCPlatesTable plates={modalStrip.plates} /> : null}
      </Modal>

      <Table verticalSpacing="sm" striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Index</Table.Th>
            <Table.Th>Scanline</Table.Th>
            <Table.Th>Access list index</Table.Th>
            <Table.Th>Access list count</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
};

export default BDHCStripsTab;
