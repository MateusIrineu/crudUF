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

      const itensParaAssociacao = itens.map((item) => ({
        id: item.produtoId,
        ItensPedidos: {
          quantidade: item.quantidade,
        },
      }));

      await novoPedido.setProdutos(itensParaAssociacao);

      const pedidoCompleto = await PedidoModel.findByPk(novoPedido.id, {
        include: [
          { model: ClienteModel, as: "clientes" },
          {
            model: ProdutoModel,
            as: "produtos",
            through: {
              model: ItensPedidos,
              attributes: ["quantidade"],
            },
          },
        ],
      });

      res.status(200).json({ msg: "Pedido criado com sucesso!", pedido: pedidoCompleto });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }
}

export default PedidoController;