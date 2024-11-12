const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pagina = sequelize.define('Pagina', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  contenido: { type: DataTypes.TEXT },
  imagen_url: { type: DataTypes.STRING },
  imagen_extra_url: { type: DataTypes.STRING },
  tipo: { type: DataTypes.ENUM('slide', 'noticia'), allowNull: false }
}, {
  tableName: 'Paginas',
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Pagina;
