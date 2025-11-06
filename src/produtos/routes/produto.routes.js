import express from 'express';
import ProdutoController from '../controllers/produto.controller.js';

const prudutoRouter = express.Router();

// criar produto
prudutoRouter.post('/criar', ProdutoController.criarProduto);

// listar todos os produtos
prudutoRouter.get('/', ProdutoController.listarProdutos);

// atualizar produto
prudutoRouter.patch('/atualizar/:id', ProdutoController.atualizarProduto);

// deletar produto
prudutoRouter.delete('/deletar/:id', ProdutoController.excluirProduto);

export default prudutoRouter;