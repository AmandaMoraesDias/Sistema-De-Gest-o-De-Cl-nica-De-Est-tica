import express from "express";
import cors from "cors";

import clientesRoute from "./routes/clientes.js";
import servicoRoutes from "./routes/servicos.js";
import agendamentoRoutes from "./routes/agendamentos.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROTAS
app.use("/clientes", clientesRoute);
app.use("/servicos", servicoRoutes);
app.use("/agendamentos", agendamentoRoutes);

// PORTA ÚNICA
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
