import { DataTypes } from "sequelize";
import sequelize from "../../../config/database";

const ProdutoModel = sequelize.define(
    'produtos', {

    },

    {
        tableName: 'clientes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        deletedAt: 'deletado_em'
    },
);

export default ProdutoModel;