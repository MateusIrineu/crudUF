import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

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
  },
  {
    tableName: "pedidos",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
    deletedAt: "deletado_em",
  }
);

export default PedidoModel;
