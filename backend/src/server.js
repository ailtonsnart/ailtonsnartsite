require("dotenv").config();
const avaliacaoRoutes = require("./routes/avaliacao.routes");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors({
  origin: "https://ailtonsnartsite.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 MUITO IMPORTANTE (resolve preflight)
app.options("*", cors());

app.use("/avaliacao", avaliacaoRoutes);
 
app.get("/", (req, res) => {
  res.send("API rodando");
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
