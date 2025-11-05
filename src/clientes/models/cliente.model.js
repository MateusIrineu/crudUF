import { DataTypes } from 'sequelize';
import  sequelize  from '../../../config/database.js';

const ClienteModel = sequelize.define(
    'clientes', {

    },

    {
        tableName: 'clientes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        deletedAt: 'deletado_em'
    }
);

export default ClienteModel;