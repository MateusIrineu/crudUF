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
      // produtosIds vai armazenar todos os produtos pela FK produtoId
      // busco em produtosExistentes com método findAll todos os protudos que batem com o produtoId
      const produtosExistentes = await ProdutoModel.findAll({
        where: { id: produtosIds },
      });

      if (produtosExistentes.length !== produtosIds.length) {
        return res.status(400).json({
          msg: "Algum produto não foi encontrado ou os IDs não são correspondentes.",
        });
      }

      const associacoes = produtosExistentes.map((produto) => {
        // vendo se cada item de produtosExistentes (denominado i de itens) tem sua chave estrangeira igual a sua chave primária
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
          { model: ClienteModel, as: "DetalhesCliente" },
          {
            model: ProdutoModel,
            as: "DetalheProduto",
            through: {
              model: ItensPedidos, // ARRUMAR ISSO AQUI NA SEGUNDA
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
      const todosPedidos = await PedidoModel.findAll();
      if (todosPedidos === 0) {
        return res.status(400).json({ msg: "Nenhum pedido encontrado." });
      }

      res.status(200).json(todosPedidos);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor", error: error.message });
    }
  }

  static async atualizarPedido(req, res) {
    try {
      const id = req.params.id;
      const procurandoPedido = await PedidoModel.findByPk(id);
      if (procurandoPedido === 0) {
        return res
          .status(400)
          .json({ msg: "Pedido não encontrado.", error: error.message });
      }
      const { quantidade } = req.body;

      const pedidoAtualizado = await PedidoModel.update(
        { quantidade },
        { where: { id } }
      );
      res.status(200).json({ msg: "Pedido atualizado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }
}

export default PedidoController;
