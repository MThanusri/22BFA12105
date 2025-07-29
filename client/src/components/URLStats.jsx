import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import log from "../logger/logger";
import "./../styles/urlStats.css"; // CSS import added

function URLStats() {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);

  const handleFetch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/shorturls/${shortcode}`);
      setStats(res.data);
      log("frontend", "info", "component", `Fetched stats for ${shortcode}`);
    } catch (err) {
      log("frontend", "error", "component", `Stats fetch failed: ${err.message}`);
    }
  };

  return (
    <Box className="url-stats-container" sx={{ p: 3 }}>
      <Typography variant="h5" className="url-stats-title">URL Statistics</Typography>

      <TextField
        label="Shortcode"
        fullWidth
        className="url-stats-input"
        sx={{ my: 2 }}
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />

      <Button
        variant="contained"
        className="url-stats-button"
        onClick={handleFetch}
      >
        Fetch Stats
      </Button>

      {stats && (
        <Box mt={3} className="stats-result-box">
          <Typography variant="body1">Original URL: {stats.url}</Typography>
          <Typography variant="body2">Created At: {stats.createdAt}</Typography>
          <Typography variant="body2">Expires At: {stats.expiresAt}</Typography>
          <Typography variant="body2">Total Clicks: {stats.clicks}</Typography>

          <Typography variant="h6" mt={2}>Click History</Typography>
          {stats.clickDetails?.map((c, i) => (
            <Box key={i} className="click-entry">
              <Typography>Time: {c.timestamp}</Typography>
              <Typography>Source: {c.referrer || "Direct"}</Typography>
              <Typography>Location: {c.location || "Unknown"}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default URLStats;
