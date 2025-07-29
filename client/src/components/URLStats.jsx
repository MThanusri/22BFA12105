import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import log from "../logger/logger";

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">URL Statistics</Typography>
      <TextField label="Shortcode" fullWidth sx={{ my: 2 }} value={shortcode} onChange={(e) => setShortcode(e.target.value)} />
      <Button variant="contained" onClick={handleFetch}>Fetch Stats</Button>

      {stats && (
        <Box mt={3}>
          <Typography variant="body1">Original URL: {stats.url}</Typography>
          <Typography variant="body2">Created At: {stats.createdAt}</Typography>
          <Typography variant="body2">Expires At: {stats.expiresAt}</Typography>
          <Typography variant="body2">Total Clicks: {stats.clicks}</Typography>
          <Typography variant="h6" mt={2}>Click History</Typography>
          {stats.clickDetails?.map((c, i) => (
            <Box key={i} sx={{ border: "1px solid #ccc", my: 1, p: 1 }}>
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