require("dotenv").config();
const avaliacaoRoutes = require("./routes/avaliacao.routes");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://ailtonsnartsite.netlify.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use("/avaliacao", avaliacaoRoutes);
 
app.get("/", (req, res) => {
  res.send("API rodando");
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
