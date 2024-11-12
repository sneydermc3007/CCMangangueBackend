const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo', 'Pendiente'),
    defaultValue: 'Pendiente'
  }
}, {
  tableName: 'Videos',
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Video;
