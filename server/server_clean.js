const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/tournaments", (req, res) => {
  res.json({ success: true, message: "Tournament endpoint working!", data: { totalEvents: 847, tournaments: [{ name: "Pro Tour", players: 847, status: "LIVE" }] } });
});

app.get("/api/news", (req, res) => {
  res.json({ success: true, message: "News endpoint working!", data: { totalArticles: 156, news: [{ id: 1, title: "Pokemon TCG High", date: "2025-06-28" }] } });
});

app.get("/api/events", (req, res) => {
  res.json({ success: true, message: "Events endpoint working!", data: { totalEvents: 423, events: [{ id: 1, name: "Grand Prix Vegas", date: "2025-07-15" }] } });
});

app.listen(PORT, () => {
  console.log("CardHood Server running on port " + PORT);
});
