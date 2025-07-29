import React from "react";
import URLShortener from "./components/URLShortener";
import URLStats from "./components/URLStats";
import { Box, Tabs, Tab } from "@mui/material";

function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
        <Tab label="Shorten URLs" />
        <Tab label="View Stats" />
      </Tabs>

      {tab === 0 && <URLShortener />}
      {tab === 1 && <URLStats />}
    </Box>
  );
}

export default App;
