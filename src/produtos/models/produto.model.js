import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";
import PedidoModel from "../../pedidos/models/pedido.model.js";
import ItensPedidos from "../../itensPedidos/itemPedido.model.js";

const ProdutoModel = sequelize.define(
    'produtos', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },

        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        preco: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        estoque: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },

    {
        tableName: 'produtos',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        deletedAt: 'deletado_em'
    },
);

// 1 produto pode estar em vários pedidos
ProdutoModel.belongsToMany(PedidoModel, {
    through: ItensPedidos,
    foreignKey: 'produtoId',
    as: 'pedidos'
})

export default ProdutoModel;