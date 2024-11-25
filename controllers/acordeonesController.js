const { Acordeon, Contenido } = require('../models/Acordeon');

const createAcordeon = async (req, res) => {
  const { header, contenido } = req.body;

  if (!header || !Array.isArray(contenido)) {
    return res.status(400).json({ message: 'El encabezado y el contenido son obligatorios' });
  }

  try {
    const newAcordeon = await Acordeon.create({ header });
    const newContents = contenido.map((item) => ({
      ...item,
      acordeonId: newAcordeon.id,
    }));
    await Contenido.bulkCreate(newContents);

    return res.status(201).json({ message: 'Acordeón creado exitosamente', data: newAcordeon });
  } catch (error) {
    console.error('Error al crear el acordeón:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { createAcordeon };