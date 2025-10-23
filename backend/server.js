// backend/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

/**
 * Lock CORS to your frontend in prod.
 * While testing on Render before the frontend is live, you can leave origin: true.
 * After the frontend is live, set FRONTEND_ORIGIN in Render env and restart.
 */
const allowedOrigin = process.env.FRONTEND_ORIGIN || true;
app.use(cors({ origin: allowedOrigin }));

// Health
app.get("/health", (_req, res) =>
  res.status(200).json({ ok: true, service: "acquisition-scout-backend" })
);

// Root
app.get("/", (_req, res) => {
  res.status(200).json({ app: "acquisition-scout-backend", status: "ready" });
});

// === NEW: Proxy route to run your OpenAI Workflow ===
app.post("/api/run-workflow", async (req, res) => {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const WORKFLOW_ID = req.body?.workflow_id || process.env.WORKFLOW_ID;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    }
    if (!WORKFLOW_ID) {
      return res.status(400).json({ error: "Missing workflow_id" });
    }

    const payload = {
      workflow_id: WORKFLOW_ID,
      inputs: req.body?.inputs || { prompt: req.body?.prompt ?? "Hello from Acquisition Scout" }
    };

    // Hard-lock absolute URL to avoid the “Invalid URL (POST /v1/...)” issue
    const url = "https://api.openai.com/v1/workflows/runs";

    const r = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "workflows=v1"
      },
      body: JSON.stringify(payload)
    });

    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ error: data?.error || data || "OpenAI error" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Server error" });
  }
});

// Your stubs (keep if you want them)
app.post("/marketplace_search", (req, res) => {
  res.json({ listings: [] });
});

app.post("/score_listing", (req, res) => {
  res.json({ score: 0, rationale: "stub" });
});

const port = process.env.PORT || 8080; // Render injects PORT
app.listen(port, () => console.log(`Backend listening on port ${port}`));
