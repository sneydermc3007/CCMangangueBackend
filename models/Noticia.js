const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Noticia = sequelize.define('Noticia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo', 'Pendiente'),
    defaultValue: 'Pendiente'
  },
  tipo: {
    type: DataTypes.ENUM('Principal', 'Secundaria', 'Empresarial'),
    defaultValue: 'Secundaria'
  },
  fecha_publicacion: {
    type: DataTypes.DATEONLY
  },
  imagen_url: {
    type: DataTypes.STRING(255)
  },
  contenido: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Noticias',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Noticia;
