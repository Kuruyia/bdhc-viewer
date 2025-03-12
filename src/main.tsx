import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "./main.css";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const theme = createTheme({
  fontFamily: "Red Hat Text, sans-serif",
  fontFamilyMonospace: "Red Hat Mono, monospace",
  headings: {
    fontFamily: "Red Hat Display, sans-serif",
  },
  primaryColor: "violet",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
