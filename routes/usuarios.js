const express = require('express');
const router = express.Router();
const { obtenerUsuarios, loginUsuario, crearUsuario, actualizarUsuario } = require('../controllers/usuariosController');

router.get('/', obtenerUsuarios);
router.post('/login', loginUsuario);
router.post('/crear', crearUsuario);
router.put('/:id', actualizarUsuario);

module.exports = router;