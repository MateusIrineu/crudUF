import dotenv from "dotenv";
import express from "express";
import sequelize from "../config/database.js";
import './modules.index.js'
import cors from 'cors';

dotenv.config();

async function sincronizar() {
  try {
    await sequelize.authenticate();
    console.log("Conexão realizada com sucesso!");

    await sequelize.sync({ force: false, alter: true });
    console.log("Tabelas criadas com sucesso");

  } catch (error) {
    console.error("Erro ao se conectar com o banco:", error.message);
    process.exit(1);
  }
}

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

import clienteRouter from "./clientes/routes/cliente.routes.js";
import prudutoRouter from "./produtos/routes/produto.routes.js";
import pedidoRouter from "./pedidos/routes/pedido.routes.js";

app.use('/api/cliente', clienteRouter);
app.use('/api/pedido', pedidoRouter);
app.use('/api/produto', prudutoRouter);

const PORT = process.env.PORT;

async function iniciarServidor() {
  await sincronizar(); // aqui ele espera a sincronização acontecer para depois subir o servidor

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

iniciarServidor(); // depois de sincronizar, o servidor é executado