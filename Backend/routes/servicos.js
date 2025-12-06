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

// LISTAR SERVIÇOS
router.get("/", (req, res) => {
  const db = lerDB();
  res.json(db.servicos || []);
});

// CADASTRAR SERVIÇO
router.post("/", (req, res) => {
  const { nome, preco } = req.body;
  const db = lerDB();

  const novo = {
    id: Date.now().toString(),  // <<< SEMPRE STRING
    nome,
    preco
  };

  db.servicos.push(novo);
  salvarDB(db);

  res.status(201).json(novo);
});

export default router;
