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

// po-combo dropdown
// precificação uni/tot
// nome do cliente e ocultar o id na tabela e valor total do pedido
