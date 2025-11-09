import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const dataFile = "./data/demoData.json";

app.get("/api/inventory", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  res.json(data);
});

app.post("/api/inventory", (req, res) => {
  const newItem = req.body;
  const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  data.push(newItem);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server läuft auf Port 5000"));

// Dann könnte dein React-Frontend später per fetch("http://localhost:5000/api/inventory") auf echte Dateien zugreifen.