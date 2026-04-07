const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.criar = async (req, res) => {
  try {
    const { nome, estrelas, comentario } = req.body;

    const nova = await prisma.avaliacao.create({
      data: {
        nome,
        estrelas: Number(estrelas),
        comentario
      }
    });

    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao salvar" });
  }
};

exports.listar = async (req, res) => {
  const dados = await prisma.avaliacao.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(dados);
};

exports.stats = async (req, res) => {
  const total = await prisma.avaliacao.count();

  const media = await prisma.avaliacao.aggregate({
    _avg: { estrelas: true }
  });

  res.json({
    total,
    media: media._avg.estrelas || 0
  });
};