const { Acordeon, Contenido } = require('../models/Acordeon');

const getAllAcordeons = async (req, res) => {
    try {
      const acordeons = await Acordeon.findAll({
        include: [{ model: Contenido, as: 'contenido' }]
      });
      return res.status(200).json(acordeons);
    } catch (error) {
      console.error('Error al obtener los acordeones:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

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

const updateAcordeon = async (req, res) => {
    const { id } = req.params;
    const { header, contenido } = req.body;
  
    try {
      const acordeon = await Acordeon.findByPk(id);
  
      if (!acordeon) {
        return res.status(404).json({ message: 'Acordeón no encontrado' });
      }
  
      acordeon.header = header || acordeon.header;
      await acordeon.save();
  
      if (Array.isArray(contenido)) {
        await Contenido.destroy({ where: { acordeonId: id } });
  
        const newContents = contenido.map((item) => ({
          ...item,
          acordeonId: id
        }));
        await Contenido.bulkCreate(newContents);
      }
  
      return res.status(200).json({ message: 'Acordeón actualizado exitosamente', data: acordeon });
    } catch (error) {
      console.error('Error al actualizar el acordeón:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteAcordeon = async (req, res) => {
    const { id } = req.params;
  
    try {
      const acordeon = await Acordeon.findByPk(id);
  
      if (!acordeon) {
        return res.status(404).json({ message: 'Acordeón no encontrado' });
      }
  
      await Contenido.destroy({ where: { acordeonId: id } });
  
      await acordeon.destroy();
  
      return res.status(200).json({ message: 'Acordeón eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el acordeón:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { getAllAcordeons, createAcordeon, updateAcordeon, deleteAcordeon };