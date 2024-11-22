const Noticia = require('./../models/Noticia');

const crearNoticia = async (req, res) => {
  try {
    const { nombre, descripcion, estado, tipo, fecha_publicacion, imagen_url, contenido } = req.body;
    const noticia = await Noticia.create({
      nombre,
      descripcion,
      estado,
      tipo,
      fecha_publicacion,
      imagen_url,
      contenido
    });
    res.status(201).json(noticia);
  } catch (error) {
    console.error('Error al crear la noticia:', error);
    res.status(500).json({ error: 'Error al crear la noticia' });
  }
};

const obtenerNoticias = async (req, res) => {
  try {
    const { tipo } = req.query;
    const whereClause = tipo ? { tipo } : {};
    const noticias = await Noticia.findAll({ where: whereClause });
    res.json(noticias);
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    res.status(500).json({ error: 'Error al obtener las noticias' });
  }
};

const obtenerNoticiaPorId = async (req, res) => {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (noticia) {
      res.json(noticia);
    } else {
      res.status(404).json({ message: 'Noticia no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la noticia:', error);
    res.status(500).json({ error: 'Error al obtener la noticia' });
  }
};

const actualizarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado, tipo, fecha_publicacion, imagen_url, contenido } = req.body;

    const noticia = await Noticia.findByPk(id);
    if (noticia) {
      noticia.nombre = nombre || noticia.nombre;
      noticia.descripcion = descripcion || noticia.descripcion;
      noticia.estado = estado || noticia.estado;
      noticia.tipo = tipo || noticia.tipo;
      noticia.fecha_publicacion = fecha_publicacion || noticia.fecha_publicacion;
      noticia.imagen_url = imagen_url || noticia.imagen_url;
      noticia.contenido = contenido || noticia.contenido;

      await noticia.save();
      res.json(noticia);
    } else {
      res.status(404).json({ message: 'Noticia no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la noticia:', error);
    res.status(500).json({ error: 'Error al actualizar la noticia' });
  }
};

const eliminarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await Noticia.findByPk(id);
    if (noticia) {
      await noticia.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Noticia no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    res.status(500).json({ error: 'Error al eliminar la noticia' });
  }
};

module.exports = {
  crearNoticia,
  obtenerNoticias,
  obtenerNoticiaPorId,
  actualizarNoticia,
  eliminarNoticia
};
