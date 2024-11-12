const Usuario = require('../models/Usuario');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, activo } = req.body;
    const usuario = await Usuario.create({ nombre, email, password, activo });
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, activo } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nombre = nombre || usuario.nombre;
      usuario.email = email || usuario.email;
      usuario.password = password || usuario.password;
      usuario.activo = activo !== undefined ? activo : usuario.activo; 

      await usuario.save();
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

module.exports = { obtenerUsuarios, crearUsuario, actualizarUsuario };