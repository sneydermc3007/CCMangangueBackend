const express = require('express');
const router = express.Router();
const { obtenerUsuarios, crearUsuario, actualizarUsuario } = require('../controllers/usuariosController');

router.get('/', obtenerUsuarios);
router.post('/crear', crearUsuario);
router.put('/:id', actualizarUsuario);

module.exports = router;