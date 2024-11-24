const Slide = require('../models/Slide');
const Pagina = require('../models/Pagina');

module.exports = {
  async createSlide(req, res) {
    try {
      const { link, tipo_link, posicion, estado, portada_url } = req.body;
      let pagina_id = null;

      if (tipo_link === 'interno') {
        const nuevaPagina = await Pagina.create({ titulo: 'Nueva Página', tipo: 'slide' });
        pagina_id = nuevaPagina.id;
      }

      const nuevoSlide = await Slide.create({
        pagina_id,
        link,
        tipo_link,
        posicion,
        estado,
        portada_url
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
      const slide = await Slide.findByPk(id, { include: { model: Pagina, as: 'pagina', required: false } });

      if (!slide)
        return res.status(404).json({ error: 'Slide no encontrado' });

      if (slide.tipo_link === 'interno')
        slide.setDataValue('link', null);

      if (slide.tipo_link === 'externo')
        slide.setDataValue('pagina', null);

      res.json(slide);
    } catch (error) {
      console.error('Error al obtener el slide:', error);
      res.status(500).json({ error: 'Error al obtener el slide' });
    }
  },

  async getAllSlides(req, res) {
    try {
      const slides = await Slide.findAll({ include: { model: Pagina, as: 'pagina', required: false } });
      
      if (!slides || slides.length === 0)
        return res.status(204).json();

      slides.forEach((slide) => {

        if (slide.tipo_link === 'interno')
          slide.setDataValue('link', null);

        if (slide.tipo_link === 'externo')
          slide.setDataValue('pagina', null);
      });

      res.json(slides);
    } catch (error) {
      console.error('Error al obtener los slides:', error);
      res.status(500).json({ error: 'Error al obtener los slides' });
    }
  },

  async updateSlide(req, res) {
    try {
      const { id } = req.params;
      const { link, tipo_link, posicion, estado, portada_url } = req.body;

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
      slide.portada_url = portada_url;

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
