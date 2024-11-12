const EventoCalendario = require('./../models/EventoCalendario');

module.exports = {
  async createEvento(req, res) {
    try {
      const { titulo, fecha, hora_inicio, hora_fin, descripcion, estado } = req.body;
      const nuevoEvento = await EventoCalendario.create({
        titulo, fecha, hora_inicio, hora_fin, descripcion, estado
      });
      res.status(201).json(nuevoEvento);
    } catch (error) {
      console.error('Error al crear el evento:', error);
      res.status(500).json({ error: 'Error al crear el evento' });
    }
  },

  async getEventoById(req, res) {
    try {
      const { id } = req.params;
      const evento = await EventoCalendario.findByPk(id);
      if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
      res.json(evento);
    } catch (error) {
      console.error('Error al obtener el evento:', error);
      res.status(500).json({ error: 'Error al obtener el evento' });
    }
  },

  async getAllEventos(req, res) {
    try {
      const eventos = await EventoCalendario.findAll();
      res.json(eventos);
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
      res.status(500).json({ error: 'Error al obtener los eventos' });
    }
  },

  async updateEvento(req, res) {
    try {
      const { id } = req.params;
      const { titulo, fecha, hora_inicio, hora_fin, descripcion, estado } = req.body;
      const evento = await EventoCalendario.findByPk(id);
      if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });

      evento.titulo = titulo;
      evento.fecha = fecha;
      evento.hora_inicio = hora_inicio;
      evento.hora_fin = hora_fin;
      evento.descripcion = descripcion;
      evento.estado = estado;

      await evento.save();
      res.json(evento);
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      res.status(500).json({ error: 'Error al actualizar el evento' });
    }
  },

  async deleteEvento(req, res) {
    try {
      const { id } = req.params;
      const evento = await EventoCalendario.findByPk(id);
      if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
      
      await evento.destroy();
      res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      res.status(500).json({ error: 'Error al eliminar el evento' });
    }
  }
};
