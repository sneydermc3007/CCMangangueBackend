const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Convocatoria = sequelize.define(
    "Convocatoria",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isUrl: true
            },
        },
        resumen: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("activo", "inactivo"),
            defaultValue: "activo",
        }
    },
    {
        tableName: "Convocatorias",
        timestamps: false,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Convocatoria;