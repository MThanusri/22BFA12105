const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const urlStore = require("../data");
const log = require("../utils/logger");

router.post("/shorturls", async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || !/^https?:\/\//.test(url)) {
    await log("backend", "error", "route", "Invalid or missing URL");
    return res.status(400).json({ error: "Invalid or missing URL" });
  }

  let code = shortcode || nanoid(6);
  if (urlStore[code]) {
    await log("backend", "warn", "route", "Shortcode collision");
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + validity * 60000);

  urlStore[code] = {
    url,
    createdAt,
    expiresAt,
    clicks: 0,
    clickDetails: []
  };

  await log("backend", "info", "route", `Shortened URL created: ${code}`);

  return res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiresAt.toISOString()
  });
});

router.get("/shorturls/:code", async (req, res) => {
  const code = req.params.code;
  const entry = urlStore[code];

  if (!entry) {
    await log("backend", "error", "route", `Stats requested for non-existent ${code}`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  return res.json({
    url: entry.url,
    createdAt: entry.createdAt.toISOString(),
    expiresAt: entry.expiresAt.toISOString(),
    clicks: entry.clicks,
    clickDetails: entry.clickDetails
  });
});


router.get("/:code", async (req, res) => {
  const code = req.params.code;
  const entry = urlStore[code];

  if (!entry) {
    await log("backend", "warn", "route", `Shortcode ${code} not found`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date() > entry.expiresAt) {
    await log("backend", "warn", "route", `Shortcode ${code} expired`);
    return res.status(410).json({ error: "Link expired" });
  }

  entry.clicks += 1;
  entry.clickDetails.push({
    timestamp: new Date(),
    referrer: req.get("Referrer") || "Direct",
    location: "India" 
  });

  await log("backend", "info", "route", `Redirected for shortcode ${code}`);
  return res.redirect(entry.url);
});

module.exports = router;
