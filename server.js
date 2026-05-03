const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const cases = [
  { name: "Common Item", chance: 0.6, value: 100 },
  { name: "Rare Item", chance: 0.3, value: 500 },
  { name: "Epic Item", chance: 0.09, value: 2000 },
  { name: "Legendary Item", chance: 0.01, value: 10000 }
];

function openCase(items) {
  const rand = Math.random();
  let sum = 0;

  for (const item of items) {
    sum += item.chance;
    if (rand <= sum) return item;
  }
}

app.get("/", (req, res) => {
  res.send("Backend работает ✅");
});

app.post("/api/open-case", (req, res) => {
  const item = openCase(cases);
  res.json({ item });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
