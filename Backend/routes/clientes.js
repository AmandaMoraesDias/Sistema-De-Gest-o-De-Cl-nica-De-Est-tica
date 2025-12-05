import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Cadastrar cliente
router.post("/", async (req, res) => {
  try {
    const { nome, email, dataNascimento, observacoes } = req.body;

    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        dataNascimento: new Date(dataNascimento),
        observacoes
      }
    });

    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar cliente" });
  }
});

// Consultar clientes (filtro por nome)
router.get("/", async (req, res) => {
  try {
    const nomeBusca = req.query.nome || "";

    const lista = await prisma.cliente.findMany({
      where: {
        nome: {
          contains: nomeBusca,
          mode: "insensitive"
        }
      }
    });

    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar clientes" });
  }
});

export default router;
