import express from 'express';
import ClienteController from '../controllers/cliente.controller.js';

const router = express.Router()

// criar cliente
router.post('/criar', ClienteController.criarCliente);

// listar cliente
router.get('/', ClienteController.listarClientes);

// atualizar cliente
router.patch('/atualizar/:id', ClienteController.atualizarCliente);

// excluir cliente
router.delete('/deletar/:id', ClienteController.excluirCliente);

export default router;