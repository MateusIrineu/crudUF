import express from 'express';
import ClienteController from '../controllers/cliente.controller.js';

const clienteRouter = express.Router()

// criar cliente
clienteRouter.post('/criar', ClienteController.criarCliente);

// listar cliente
clienteRouter.get('/', ClienteController.listarClientes);

// atualizar cliente
clienteRouter.patch('/atualizar/:id', ClienteController.atualizarCliente);

// excluir cliente
clienteRouter.delete('/deletar/:id', ClienteController.excluirCliente);

export default clienteRouter;