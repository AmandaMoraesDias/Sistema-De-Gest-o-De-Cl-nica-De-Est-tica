import express from "express";
import fs from "fs";
const router = express.Router();

const DB_PATH = "./db.json";

function lerDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function salvarDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// CADASTRAR CLIENTE
router.post("/", (req, res) => {
  try {
    const { nome, email, dataNascimento, observacoes } = req.body;

    const db = lerDB();

    const novoCliente = {
      id: Date.now().toString(),   // <<< SEMPRE STRING
      nome,
      email,
      dataNascimento,
      observacoes
    };

    db.clientes.push(novoCliente);
    salvarDB(db);

    res.status(201).json(novoCliente);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar cliente" });
  }
});

// LISTAR CLIENTES
router.get("/", (req, res) => {
  try {
    const nomeBusca = req.query.nome?.toLowerCase() || "";

    const db = lerDB();

    const filtrados = db.clientes.filter(c =>
      c.nome.toLowerCase().includes(nomeBusca)
    );

    res.json(filtrados);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar clientes" });
  }
});

export default router;
