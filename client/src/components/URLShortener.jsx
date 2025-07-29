import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import log from "../logger/logger";
import "./../styles/urlShortener.css"; // CSS import

function URLShortener() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      if (!/^https?:\/\//.test(url)) {
        alert("Invalid URL");
        return;
      }

      const body = { url, validity, shortcode };
      const res = await axios.post("http://localhost:5000/api/shorturls", body);

      setResult(res.data);
      log("frontend", "info", "component", `URL shortened to ${res.data.shortLink}`);
    } catch (err) {
      log("frontend", "error", "component", `Shortening failed: ${err.message}`);
    }
  };

  return (
    <Box className="url-shortener-container" sx={{ p: 3 }}>
      <Typography variant="h5" className="url-shortener-title">URL Shortener</Typography>

      <TextField
        label="Long URL"
        fullWidth
        className="url-shortener-input"
        sx={{ my: 1 }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <TextField
        label="Validity (mins)"
        type="number"
        fullWidth
        className="url-shortener-input"
        sx={{ my: 1 }}
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <TextField
        label="Custom Shortcode (optional)"
        fullWidth
        className="url-shortener-input"
        sx={{ my: 1 }}
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <Button
        variant="contained"
        className="url-shortener-button"
        onClick={handleSubmit}
      >
        Shorten
      </Button>

      {result && (
        <Box mt={2} className="result-box">
          <Typography variant="body1">
            Short Link:{" "}
            <a href={result.shortLink} target="_blank" rel="noreferrer">
              {result.shortLink}
            </a>
          </Typography>
          <Typography variant="body2">Expires at: {result.expiry}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default URLShortener;
