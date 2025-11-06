import express from 'express';
import PedidoController from '../controllers/pedido.controller.js';

const pedidoRouter = express.Router();

// criar pedido
pedidoRouter.post('/criar', PedidoController.criarPedido);

export default pedidoRouter;