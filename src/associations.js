import ClienteModel from "./clientes/models/cliente.model.js";
import ProdutoModel from "./produtos/models/produto.model.js";
import PedidoModel from "./pedidos/models/pedido.model.js";
import ItensPedidos from "./itensPedidos/itemPedido.model.js";

// relação cliente - pedido (1 para N)
ClienteModel.hasMany(PedidoModel, {
    foreignKey: 'clienteId',
    as: 'pedidosCliente'
});
PedidoModel.belongsTo(ClienteModel, {
    foreignKey: 'clienteId',
    as: 'clientes'
});

// relação pedido - produto (M para N)
PedidoModel.belongsToMany(ProdutoModel, {
    through: ItensPedidos,
    foreignKey: 'pedidoId',
    as: 'produtos'
});
ProdutoModel.belongsToMany(PedidoModel, {
    through: ItensPedidos,
    foreignKey: 'produtoId',
    as: 'pedidosProduto'
});

export default {
    ClienteModel,
    ProdutoModel,
    PedidoModel,
    ItensPedidos
};