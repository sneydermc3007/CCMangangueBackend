const Video = require('../models/Video');

const crearVideo = async (req, res) => {
  try {
    const { titulo, url, estado } = req.body;
    const video = await Video.create({ titulo, url, estado });
    res.status(201).json(video);
  } catch (error) {
    console.error('Error al crear el video:', error);
    res.status(500).json({ error: 'Error al crear el video' });
  }
};

const obtenerVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    console.error('Error al obtener los videos:', error);
    res.status(500).json({ error: 'Error al obtener los videos' });
  }
};

const actualizarVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, url, estado } = req.body;

    const video = await Video.findByPk(id);
    if (video) {
      video.titulo = titulo || video.titulo;
      video.url = url || video.url;
      video.estado = estado || video.estado;

      await video.save();
      res.json(video);
    } else {
      res.status(404).json({ message: 'Video no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el video:', error);
    res.status(500).json({ error: 'Error al actualizar el video' });
  }
};

module.exports = {
  crearVideo,
  obtenerVideos,
  actualizarVideo
};
