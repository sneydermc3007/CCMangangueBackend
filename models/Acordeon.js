const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Acordeon = sequelize.define('Acordeon', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  header: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'Acordeon',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

const Contenido = sequelize.define('Contenido', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.JSON, allowNull: false },
  enlace: { type: DataTypes.STRING },
  archivo: { type: DataTypes.STRING },
  acordeonId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'Contenido',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

Acordeon.hasMany(Contenido, { foreignKey: 'acordeonId', as: 'contenido' });
Contenido.belongsTo(Acordeon, { foreignKey: 'acordeonId' });

module.exports = { Acordeon, Contenido };