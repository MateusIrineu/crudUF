import express from 'express';
import PedidoController from '../controllers/pedido.controller.js';

const pedidoRouter = express.Router();

// criar pedido
pedidoRouter.post('/criar', PedidoController.criarPedido);

// listar pedidos
pedidoRouter.get('/', PedidoController.listarPedidos);

// atualizar pedido
pedidoRouter.patch('/atualizar/:id', PedidoController.atualizarPedido);

export default pedidoRouter;