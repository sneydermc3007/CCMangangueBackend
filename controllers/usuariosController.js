const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = (await Usuario.findAll()).map(usuario => {
      const { id, nombre, email, activo } = usuario;
      return { id, nombre, email, activo };
    })

    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido)
      return res.status(401).json({ message: 'Contraseña incorrecta' });

    if(usuario.activo === false)
      return res.status(403).json({ message: 'Usuario inactivo' });

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const crearUsuario = async (req, res) => {
  const { nombre, email, password, activo } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente)
      return res.status(400).json({ message: 'El email ya está en uso' });

    const usuario = await Usuario.create({ nombre, email, password: hashedPassword, activo });

    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
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
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

module.exports = { obtenerUsuarios, loginUsuario, crearUsuario, actualizarUsuario };