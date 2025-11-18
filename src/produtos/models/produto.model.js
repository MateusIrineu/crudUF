import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

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
            type: DataTypes.DECIMAL(10, 2),
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

export default ProdutoModel;