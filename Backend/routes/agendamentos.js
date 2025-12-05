import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Cadastrar agendamento
router.post("/", async (req, res) => {
  try {
    const { clienteId, servicoId, data, hora, observacoes } = req.body;

    const novo = await prisma.agendamento.create({
      data: {
        clienteId: Number(clienteId),
        servicoId: Number(servicoId),
        data,
        hora,
        observacoes,
        status: "pendente"
      }
    });

    res.status(201).json(novo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar agendamento" });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const lista = await prisma.agendamento.findMany();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar agendamentos" });
  }
});

export default router;
