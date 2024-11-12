const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EventoCalendario = sequelize.define('EventoCalendario', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  hora_inicio: { type: DataTypes.TIME, allowNull: true },
  hora_fin: { type: DataTypes.TIME, allowNull: true },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  estado: { type: DataTypes.ENUM('activo', 'inactivo'), defaultValue: 'activo' },

}, {
  tableName: 'EventosCalendario',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = EventoCalendario;
