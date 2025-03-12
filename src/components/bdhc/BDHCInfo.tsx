import { Tabs } from "@mantine/core";
import {
  IconArrowsVertical,
  IconCalculator,
  IconDots,
  IconHeading,
  IconList,
  IconRectangle,
  IconSkewY,
  IconTable,
} from "@tabler/icons-react";
import * as React from "react";

import { BDHC } from "../../data/bdhc/BDHC.ts";
import { BDHCPlate } from "../../data/bdhc/BDHCPlate.ts";
import { BDHCStrip } from "../../data/bdhc/BDHCStrip.ts";
import BDHCAccessListTable from "./BDHCAccessListTable.tsx";
import BDHCHeaderTable from "./BDHCHeaderTable.tsx";
import BDHCHeightCalculator from "./BDHCHeightCalculator.tsx";
import BDHCHeightsTable from "./BDHCHeightsTable.tsx";
import BDHCPlatesTable from "./BDHCPlatesTable.tsx";
import BDHCPointsTable from "./BDHCPointsTable.tsx";
import BDHCSlopesTable from "./BDHCSlopesTable.tsx";
import BDHCStripsTab from "./BDHCStripsTab.tsx";

export type BDHCInfoProps = {
  bdhc: BDHC;
  selectedPlates: BDHCPlate[];
  selectedStrip: BDHCStrip | null;
  onPlateSelect?: (plate: BDHCPlate) => void;
  onStripSelect?: (strip: BDHCStrip) => void;
};

const BDHCInfo: React.FC<BDHCInfoProps> = (props) => {
  return (
    <div style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
      <Tabs
        defaultValue="header"
        style={{ overflow: "auto", display: "flex", flexDirection: "column" }}
      >
        <Tabs.List>
          <Tabs.Tab value="header" leftSection={<IconHeading size={16} />}>
            Header
          </Tabs.Tab>
          <Tabs.Tab value="plates" leftSection={<IconRectangle size={16} />}>
            Plates
          </Tabs.Tab>
          <Tabs.Tab value="strips" leftSection={<IconTable size={16} />}>
            Strips
          </Tabs.Tab>
          <Tabs.Tab value="slopes" leftSection={<IconSkewY size={16} />}>
            Slopes
          </Tabs.Tab>
          <Tabs.Tab
            value="heights"
            leftSection={<IconArrowsVertical size={16} />}
          >
            Heights
          </Tabs.Tab>
          <Tabs.Tab value="points" leftSection={<IconDots size={16} />}>
            Points
          </Tabs.Tab>
          <Tabs.Tab value="accessList" leftSection={<IconList size={16} />}>
            Access List
          </Tabs.Tab>
          <Tabs.Tab
            value="heightCalc"
            leftSection={<IconCalculator size={16} />}
          >
            Height Calculator
          </Tabs.Tab>
        </Tabs.List>

        <div style={{ padding: "8px 0", overflow: "auto" }}>
          <Tabs.Panel value="header">
            <BDHCHeaderTable header={props.bdhc.header} />
          </Tabs.Panel>

          <Tabs.Panel value="plates">
            <BDHCPlatesTable
              plates={props.bdhc.plates}
              selectedPlates={props.selectedPlates}
              onPlateSelect={props.onPlateSelect}
            />
          </Tabs.Panel>

          <Tabs.Panel value="strips">
            <BDHCStripsTab
              strips={props.bdhc.strips}
              selectedStrip={props.selectedStrip}
              onStripSelect={props.onStripSelect}
            />
          </Tabs.Panel>

          <Tabs.Panel value="slopes">
            <BDHCSlopesTable
              slopes={props.bdhc.slopes}
              selectedPlates={props.selectedPlates}
            />
          </Tabs.Panel>

          <Tabs.Panel value="heights">
            <BDHCHeightsTable
              heights={props.bdhc.heights}
              selectedPlates={props.selectedPlates}
            />
          </Tabs.Panel>

          <Tabs.Panel value="points">
            <BDHCPointsTable
              points={props.bdhc.points}
              selectedPlates={props.selectedPlates}
            />
          </Tabs.Panel>

          <Tabs.Panel value="accessList">
            <BDHCAccessListTable
              accessList={props.bdhc.accessList}
              selectedStrip={props.selectedStrip}
            />
          </Tabs.Panel>

          <Tabs.Panel value="heightCalc">
            <BDHCHeightCalculator
              plates={props.bdhc.plates}
              selectedPlates={props.selectedPlates}
            />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
};

export default BDHCInfo;
