import PedidoModel from "../models/pedido.model.js";
import ClienteModel from "../../clientes/models/cliente.model.js";
import ProdutoModel from "../../produtos/models/produto.model.js";
import ItensPedidos from "../../itensPedidos/itemPedido.model.js";

class PedidoController {
  static async criarPedido(req, res) {
    try {
      const { clienteId, itens } = req.body;
      const buscandoCliente = await ClienteModel.findByPk(clienteId);
      if (!buscandoCliente) {
        return res.status(400).json({ msg: "Cliente não encontrado." });
      }
      if (!itens || itens.length === 0) {
        return res
          .status(400)
          .json({ msg: "O pedido deve haver pelo menos um produto." });
      }

      const novoPedido = await PedidoModel.create({ clienteId });

      const produtosIds = itens.map((item) => item.produtoId);
      const produtosExistentes = await ProdutoModel.findAll({
        where: { id: produtosIds },
      });

      if (produtosExistentes.length !== produtosIds.length) {
        return res.status(400).json({
          msg: "Algum produto não foi encontrado ou os IDs não são correspondentes.",
        });
      }

      const associacoes = produtosExistentes.map((produto) => {
        const item = itens.find((i) => i.produtoId === produto.id);
        return novoPedido.addDetalheProduto(produto, {
          through: {
            quantidade: item.quantidade,
          },
        });
      });

      await Promise.all(associacoes);

      const pedidoCompleto = await PedidoModel.findByPk(novoPedido.id, {
        include: [
          {
            model: ClienteModel,
            as: "DetalhesCliente",
            attributes: ["id", "nome"],
          },
          {
            model: ProdutoModel,
            as: "DetalheProduto",
            attributes: ['id', 'nome', 'preco'],
            through: {
              model: ItensPedidos,
              attributes: ["quantidade"],
            },
          },
        ],
      });

      res
        .status(200)
        .json({ msg: "Pedido criado com sucesso!", pedido: pedidoCompleto });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }

  static async listarPedidos(req, res) {
    try {
      const todosPedidos = await PedidoModel.findAll({
        include: [
          {
            model: ClienteModel,
            as: "DetalhesCliente",
            attributes: ["id", "nome"],
          },
          {
            model: ProdutoModel,
            as: "DetalheProduto",
            attributes: ['id', 'nome', 'preco'],
            through: {
              model: ItensPedidos,
              attributes: ["quantidade"],
            },
          },
        ],
      });

      if (todosPedidos.length === 0) {
        return res.status(400).json({ msg: "Nenhum pedido encontrado." });
      }

      res.status(200).json(todosPedidos);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor", error: error.message });
    }
  }

  static async obterPedido(req, res) {
    try {
      const id = req.params.id;
      const buscandoPedido = await PedidoModel.findByPk(id, {
        include: [
          {
            model: ClienteModel,
            as: "DetalhesCliente",
            attributes: ["id", "nome"],
          },
          {
            model: ProdutoModel,
            as: "DetalheProduto",
            attributes: ['id', 'nome', 'preco'],
            through: {
              model: ItensPedidos,
              attributes: ["quantidade"],
            },
          },
        ],
      });

      if (!buscandoPedido) {
        return res.status(404).json({ msg: "Pedido não encontrado" });
      }

      res.status(200).json(buscandoPedido);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro ao buscar pedido", error: error.message });
    }
  }

  static async atualizarPedido(req, res) {
    try {
      const pedidoId = req.params.id;
      const { itens } = req.body;

      const pedido = await PedidoModel.findByPk(pedidoId);
      if (!pedido) {
        return res.status(404).json({ msg: "Pedido não encontrado." });
      }

      // Atualizar quantidade para cada item
      if (itens && Array.isArray(itens)) {
        for (const item of itens) {
          await ItensPedidos.update(
            { quantidade: item.quantidade },
            {
              where: {
                pedidoId: pedidoId,
                produtoId: item.produtoId,
              },
            }
          );
        }
      }

      const pedidoAtualizado = await PedidoModel.findByPk(pedidoId, {
        include: [
          {
            model: ClienteModel,
            as: "DetalhesCliente",
            attributes: ["id", "nome"],
          },
          {
            model: ProdutoModel,
            as: "DetalheProduto",
            attributes: ['id', 'nome', 'preco'],
            through: {
              model: ItensPedidos,
              attributes: ["quantidade"],
            },
          },
        ],
      });

      res
        .status(200)
        .json({
          msg: "Pedido atualizado com sucesso!",
          pedido: pedidoAtualizado,
        });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }

  static async excluirPedido(req, res) {
    try {
      const id = req.params.id;
      const pedidoDeletado = await PedidoModel.destroy({ where: { id } });
      if (pedidoDeletado === 0) {
        return res.status(404).json({ msg: "Pedido não encontrado." });
      }

      res.status(200).json({ msg: "Pedido deletado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }
}

export default PedidoController;
