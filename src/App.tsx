import { Alert, Group, Text, Title, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { GizmoHelper, GizmoViewport, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  IconFile,
  IconInfoCircle,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";

import BDHCInfo from "./components/bdhc/BDHCInfo.tsx";
import Plates from "./components/threejs/Plates.tsx";
import { BDHC } from "./data/bdhc/BDHC.ts";
import { BDHCPlate } from "./data/bdhc/BDHCPlate.ts";
import { BDHCStrip } from "./data/bdhc/BDHCStrip.ts";

const App = () => {
  // Hooks
  const theme = useMantineTheme();

  // State
  const [bdhc, setBDHC] = useState<BDHC | null>(null);
  const [errorLoading, setErrorLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlates, setSelectedPlates] = useState<BDHCPlate[]>([]);
  const [selectedStrip, setSelectedStrip] = useState<BDHCStrip | null>(null);

  // Handlers
  const handleDrop = (files: FileWithPath[]) => {
    if (files.length === 0) {
      console.error("No file found");
      return;
    }

    setBDHC(null);
    setErrorLoading(false);
    setLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      setLoading(false);

      if (!e.target || !e.target.result) {
        console.error("A file has loaded, but there is no result");
        return;
      }

      const result = e.target.result;
      if (!(result instanceof ArrayBuffer)) {
        console.error("Invalid file");
        return;
      }

      const dataView = new DataView(result);
      const bdhc = new BDHC();
      bdhc
        .load(dataView)
        .then(() => {
          console.log("Loaded data", bdhc);
          setBDHC(bdhc);
        })
        .catch((e) => {
          setErrorLoading(true);
          console.error("Error loading BDHC", e);
        });
    };

    reader.onerror = (e) => {
      console.error("Error reading file", e);
      setErrorLoading(true);
      setLoading(false);
    };

    reader.onabort = (e) => {
      console.error("File reading aborted", e);
      setErrorLoading(true);
      setLoading(false);
    };

    reader.readAsArrayBuffer(files[0]);
  };

  const handlePlateSelected = (plate: BDHCPlate) => {
    setSelectedPlates([plate]);
    setSelectedStrip(null);
    console.log("Selected plate:", plate);
  };

  const handleStripSelected = (strip: BDHCStrip) => {
    setSelectedPlates(strip.plates);
    setSelectedStrip(strip);
    console.log("Selected strip:", strip);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <div
        style={{
          borderBottom: `1px solid ${theme.colors.dark[3]}`,
          padding: "8px",
        }}
      >
        <Title order={1}>BDHC Viewer</Title>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          padding: "8px",
          overflow: "auto",
          gap: 8,
        }}
      >
        <div style={{ flex: 6 }}>
          <Canvas
            camera={{ fov: 75, position: [0, 500, 0], near: 0.25, far: 10000 }}
            dpr={[1, 2]}
          >
            <OrbitControls enableDamping={false} />
            {bdhc && (
              <Plates
                plates={bdhc.plates}
                selectedPlates={selectedPlates}
                onPlateSelected={handlePlateSelected}
              />
            )}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport />
            </GizmoHelper>
          </Canvas>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <div
            style={{
              flex: 1,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {bdhc ? (
              <BDHCInfo
                bdhc={bdhc}
                selectedPlates={selectedPlates}
                selectedStrip={selectedStrip}
                onPlateSelect={handlePlateSelected}
                onStripSelect={handleStripSelected}
              />
            ) : errorLoading ? (
              <Alert
                variant="light"
                color="yellow"
                title="Error loading file"
                icon={<IconInfoCircle />}
              >
                There was an error loading the BDHC file. Please try again.
              </Alert>
            ) : (
              <Alert
                variant="light"
                color="blue"
                title="No file loaded"
                icon={<IconInfoCircle />}
              >
                Load a BDHC file using the dropzone below to view its contents.
              </Alert>
            )}
          </div>

          <Dropzone onDrop={handleDrop} loading={loading}>
            <Group
              justify="center"
              align="center"
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size={52}
                  color="var(--mantine-color-violet-6)"
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={52}
                  color="var(--mantine-color-red-6)"
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconFile
                  size={52}
                  color="var(--mantine-color-dimmed)"
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag BDHC file here or click to select
                </Text>
              </div>
            </Group>
          </Dropzone>
        </div>
      </div>
    </div>
  );
};

export default App;
