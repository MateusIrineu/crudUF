import ClienteModel from "./clientes/models/cliente.model.js";
import ProdutoModel from "./produtos/models/produto.model.js";
import PedidoModel from "./pedidos/models/pedido.model.js";
import ItensPedidos from "./itensPedidos/itemPedido.model.js";

import "./associations.js";

export default {
  ClienteModel,
  ProdutoModel,
  PedidoModel,
  ItensPedidos,
};
