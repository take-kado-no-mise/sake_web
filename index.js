const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/sake", (req, res) => {
  const results = [];

  fs.createReadStream(path.join(__dirname, "sake-embedded-jpg.csv"))
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        Sake: data["Sake"],
        SMV: Number(data["SMV"]),
        Body: Number(data["Body"]),
        Fruitiness: Number(data["Fruitiness"]),
        Floralness: Number(data["Floralness"]),
        Earthiness: Number(data["Earthiness"]),
        Savoriness: Number(data["Savoriness"]),
        Richness: Number(data["Richness"]),
        Acidity: Number(data["Acidity"]),
        Aged: Number(data["Aged"]),
        Juiciness: Number(data["Juiciness"]),
        Nigori: Number(data["Nigori"]),

        Price_by_gls: data["Price_by_gls"],
        Price_by_btl: data["Price_by_btl"],
        Prefecture: data["Prefecture"],
        Style: data["Style"],
        Image: data["Image"],
        Notes: data["Notes"],
        Tasting_notes: data["Tasting_notes"],

        x: Number(data["x"]),
        y: Number(data["y"]),
      });
    })
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err) => {
      console.error("CSV read error:", err);
      res.status(500).json({ error: "Failed to read CSV" });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});