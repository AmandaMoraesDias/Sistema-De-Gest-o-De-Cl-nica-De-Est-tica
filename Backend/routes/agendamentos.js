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

// LISTAR TODOS
router.get("/", (req, res) => {
  const db = lerDB();
  res.json(db.agendamentos || []);
});

// CADASTRAR
router.post("/", (req, res) => {
  const { clienteId, servicoId, data, hora, observacoes } = req.body;

  const db = lerDB();

  const novo = {
    id: Date.now().toString(),          // sempre string
    clienteId: clienteId.toString(),    // sempre string
    servicoId: servicoId.toString(),    // sempre string
    data,
    hora,
    observacoes,
    status: "pendente"
  };

  db.agendamentos.push(novo);
  salvarDB(db);

  res.status(201).json(novo);
});

// ATUALIZAR STATUS
router.patch("/:id", (req, res) => {
  const id = req.params.id.toString(); // string
  const { status } = req.body;

  const db = lerDB();

  const agendamento = db.agendamentos.find(a => a.id === id);

  if (!agendamento) {
    return res.status(404).json({ erro: "Agendamento não encontrado" });
  }

  agendamento.status = status || agendamento.status;

  salvarDB(db);

  res.json(agendamento);
});

export default router;
