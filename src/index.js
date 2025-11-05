import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json());

// import clientesRoutes from './src/clientes/routes.js'

// app.use('/api/cliente', clientesRoutes)
// app.use('/api/pedido', pedidosRoutes)
// app.use('/api/produto', produtosRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});