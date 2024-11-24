const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Decreto = sequelize.define('Decreto', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.ENUM('activo', 'pendiente', 'inactivo'), defaultValue: 'activo' },
  descripcion: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'Decretos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Decreto;
