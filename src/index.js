import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json());

import router from "./clientes/routes/cliente.routes.js";
import router from "./produtos/routes/pedido.routes.js";

app.use('/api/cliente', router)
// app.use('/api/pedido', pedidosRoutes)
app.use('/api/produto', router)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});