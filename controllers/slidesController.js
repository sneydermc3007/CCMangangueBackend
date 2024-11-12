const Slide = require('../models/Slide');
const Pagina = require('../models/Pagina');

module.exports = {
  async createSlide(req, res) {
    try {
      const { link, tipo_link, posicion, estado } = req.body;
      let pagina_id = null;

      // Si es un link interno, creamos una nueva página
      if (tipo_link === 'interno') {
        const nuevaPagina = await Pagina.create({ titulo: 'Nueva Página', tipo: 'slide' });
        pagina_id = nuevaPagina.id;
      }

      // Crear el slide
      const nuevoSlide = await Slide.create({
        pagina_id,
        link,
        tipo_link,
        posicion,
        estado
      });

      res.status(201).json(nuevoSlide);
    } catch (error) {
      console.error('Error al crear el slide:', error);
      res.status(500).json({ error: 'Error al crear el slide' });
    }
  },

  async getSlideById(req, res) {
    try {
      const { id } = req.params;
      const slide = await Slide.findByPk(id, { include: { model: Pagina, as: 'pagina' } });

      if (!slide) {
        return res.status(404).json({ error: 'Slide no encontrado' });
      }

      res.json(slide);
    } catch (error) {
      console.error('Error al obtener el slide:', error);
      res.status(500).json({ error: 'Error al obtener el slide' });
    }
  },

  async getAllSlides(req, res) {
    try {
      const slides = await Slide.findAll({ include: { model: Pagina, as: 'pagina' } });
      
      if (!slides || slides.length === 0) {
        return res.status(404).json({ error: 'No se encontraron slides' });
      }

      res.json(slides);
    } catch (error) {
      console.error('Error al obtener los slides:', error);
      res.status(500).json({ error: 'Error al obtener los slides' });
    }
  },

  async updateSlide(req, res) {
    try {
      const { id } = req.params;
      const { link, tipo_link, posicion, estado } = req.body;

      const slide = await Slide.findByPk(id);

      if (!slide) {
        return res.status(404).json({ error: 'Slide no encontrado' });
      }

      if (tipo_link === 'interno' && !slide.pagina_id) {
        const nuevaPagina = await Pagina.create({ titulo: 'Nueva Página', tipo: 'slide' });
        slide.pagina_id = nuevaPagina.id;
      }

      slide.link = link;
      slide.tipo_link = tipo_link;
      slide.posicion = posicion;
      slide.estado = estado;

      await slide.save();

      res.json(slide);
    } catch (error) {
      console.error('Error al actualizar el slide:', error);
      res.status(500).json({ error: 'Error al actualizar el slide' });
    }
  },

  async deleteSlide(req, res) {
    try {
      const { id } = req.params;

      const slide = await Slide.findByPk(id);
      if (!slide) {
        return res.status(404).json({ error: 'Slide no encontrado' });
      }

      await slide.destroy();
      res.json({ message: 'Slide eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el slide:', error);
      res.status(500).json({ error: 'Error al eliminar el slide' });
    }
  }
};
