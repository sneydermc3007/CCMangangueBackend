const Decreto = require('../models/Decreto');

module.exports = {
  async createDecreto(req, res) {
    try {
      const { titulo, estado, descripcion } = req.body;
      const nuevoDecreto = await Decreto.create({ titulo, estado, descripcion });
      res.status(201).json(nuevoDecreto);
    } catch (error) {
      console.error('Error al crear el decreto:', error);
      res.status(500).json({ error: 'Error al crear el decreto' });
    }
  },

  async getDecretoById(req, res) {
    try {
      const { id } = req.params;
      const decreto = await Decreto.findByPk(id);
      if (!decreto) return res.status(404).json({ error: 'Decreto no encontrado' });
      res.json(decreto);
    } catch (error) {
      console.error('Error al obtener el decreto:', error);
      res.status(500).json({ error: 'Error al obtener el decreto' });
    }
  },

  async getAllDecretos(req, res) {
    try {
      const decretos = await Decreto.findAll();
      res.json(decretos);
    } catch (error) {
      console.error('Error al obtener los decretos:', error);
      res.status(500).json({ error: 'Error al obtener los decretos' });
    }
  },

  async updateDecreto(req, res) {
    try {
      const { id } = req.params;
      const { titulo, estado, descripcion } = req.body;
      const decreto = await Decreto.findByPk(id);

      if (!decreto) return res.status(404).json({ error: 'Decreto no encontrado' });

      decreto.titulo = titulo;
      decreto.estado = estado;
      decreto.descripcion = descripcion;

      await decreto.save();
      res.json(decreto);
    } catch (error) {
      console.error('Error al actualizar el decreto:', error);
      res.status(500).json({ error: 'Error al actualizar el decreto' });
    }
  },

  async deleteDecreto(req, res) {
    try {
      const { id } = req.params;
      const decreto = await Decreto.findByPk(id);

      if (!decreto) return res.status(404).json({ error: 'Decreto no encontrado' });

      await decreto.destroy();
      res.json({ message: 'Decreto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el decreto:', error);
      res.status(500).json({ error: 'Error al eliminar el decreto' });
    }
  }
};
