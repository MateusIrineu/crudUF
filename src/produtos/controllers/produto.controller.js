import ProdutoModel from "../models/produto.model.js";

class ProdutoController {
  static async criarProduto(req, res) {
    try {
      const { nome, descricao, preco, estoque } = req.body;
      if (!nome || !descricao || !preco || !estoque) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem ser preenchidos." });
      }

      const novoProduto = await ProdutoModel.create({
        nome,
        descricao,
        preco,
        estoque,
      });
      res
        .status(201)
        .json({ msg: "Produto criado com sucesso!", produto: novoProduto });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }

  static async listarProdutos(req, res) {
    try {
      const listarTodos = await ProdutoModel.findAll();
      if (listarTodos === 0) {
        return res.status(400).json({ msg: "Nenhum produto encontrado." });
      }
      res.status(201).json(listarTodos);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }

  static async atualizarProduto(req, res) {
    try {
      const id = req.params.id;
      const { nome, descricao, preco, estoque } = req.body;
      await ProdutoModel.update(
        { nome, descricao, preco, estoque },
        { where: { id } }
      );
      res.status(201).json({ msg: "Produto atualizado com sucesso." });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }

  static async excluirProduto(req, res) {
    try {
      const id = req.params.id;
      const produtoDeletado = await ProdutoModel.destroy({ where: { id } });
      if (produtoDeletado === 0) {
        return res.status(400).json({ msg: "Produto não encontrado." });
      }
      res.status(200).json({ msg: "Produto deletado com sucesso." });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }
}
export default ProdutoController;
