import dotenv from "dotenv";
import express from "express";
import './associations.js'

dotenv.config();
const app = express();

app.use(express.json());

import clienteRouter from "./clientes/routes/cliente.routes.js";
import prudutoRouter from "./produtos/routes/produto.routes.js";
import pedidoRouter from "./pedidos/routes/pedido.routes.js";

app.use('/api/cliente', clienteRouter);
app.use('/api/pedido', pedidoRouter);
app.use('/api/produto', prudutoRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});