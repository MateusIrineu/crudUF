import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const ItensPedidos = sequelize.define(
    'itensPedidos', {
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },

    {
        tableName: 'itensPedidos',
        timestamps: false
    }
);

export default ItensPedidos;