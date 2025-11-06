import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";
// import ClienteModel from "../../clientes/models/cliente.model.js";
// import ProdutoModel from "../../produtos/models/produto.model.js";
// import ItensPedidos from "../../itensPedidos/itemPedido.model.js";

const PedidoModel = sequelize.define(
  "pedidos",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },

    quantidade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },

    data_pedido: {
      type: DataTypes.DATE,
      isDate: true,
    },
  },
  {
    tableName: "clientes",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
    deletedAt: "deletado_em",
  }
);

export default PedidoModel;
