import { DataTypes } from 'sequelize';
import  sequelize  from '../../../config/database.js';

const ClienteModel = sequelize.define(
    'clientes', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
            },
            
            nome: {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                isEmail: true
            },

            telefone: {
                type: DataTypes.STRING(11),
                allowNull: false,
            },

            endereco: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },

    {
        tableName: 'clientes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        deletedAt: 'deletado_em'
    },
);

export default ClienteModel;