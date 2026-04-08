require("dotenv").config();
const avaliacaoRoutes = require("./routes/avaliacao.routes");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://ailtonsnartsite.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/avaliacao", avaliacaoRoutes);

app.get("/", (req, res) => {
  res.send("API rodando");
});

// ✅ fallback correto (IMPORTANTE)
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});