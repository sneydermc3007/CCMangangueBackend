const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pagina = require('./Pagina');

const Slide = sequelize.define('Slide', {
  pagina_id: { 
    type: DataTypes.INTEGER, 
    allowNull: true, 
    references: { model: 'Paginas', key: 'id' }
  },
  posicion: { type: DataTypes.INTEGER, defaultValue: 0 },
  estado: { type: DataTypes.ENUM('activo', 'inactivo'), defaultValue: 'activo' },
  link: { type: DataTypes.STRING },
  tipo_link: { type: DataTypes.ENUM('interno', 'externo'), defaultValue: 'interno' }
}, {
  tableName: 'Slides',
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Slide.belongsTo(Pagina, { foreignKey: 'pagina_id', as: 'pagina' });

module.exports = Slide;
