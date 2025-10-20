import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check route
app.get("/health", (req, res) => res.status(200).send("OK"));

// Root route — confirms backend is running
app.get("/", (req, res) => {
  res.status(200).json({ app: "acquisition-scout-backend", status: "ready" });
});

// Placeholder routes for next phase
app.post("/marketplace_search", (req, res) => {
  res.json({ listings: [] });
});

app.post("/score_listing", (req, res) => {
  res.json({ score: 0, rationale: "stub" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend listening on port ${port}`));
