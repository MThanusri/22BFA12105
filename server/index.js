const express = require("express");
const cors = require("cors");
const log = require("./utils/logger");
const urlStore = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// 🟩 Main Redirect Route (must be before /api)
app.get("/:code", async (req, res) => {
  const code = req.params.code;
  const entry = urlStore[code];

  if (!entry) {
    await log("backend", "warn", "index", `Shortcode ${code} not found`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date() > entry.expiresAt) {
    await log("backend", "warn", "index", `Shortcode ${code} expired`);
    return res.status(410).json({ error: "Link expired" });
  }

  entry.clicks += 1;
  entry.clickDetails.push({
    timestamp: new Date(),
    referrer: req.get("Referrer") || "Direct",
    location: "India"
  });

  await log("backend", "info", "index", `Redirected for shortcode ${code}`);
  return res.redirect(entry.url);
});

// 🟦 API Routes (Create + Stats)
app.use("/api", require("./routes/user"));

// ✅ Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
