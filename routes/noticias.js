const express = require('express');
const router = express.Router();
const { crearNoticia, obtenerNoticias, obtenerNoticiaPorId, actualizarNoticia, eliminarNoticia } = require('../controllers/noticiasController');

router.get('/', obtenerNoticias);

router.get('/:id', obtenerNoticiaPorId);

router.post('/crear', crearNoticia);

router.put('/:id', actualizarNoticia);

router.delete('/:id', eliminarNoticia);


module.exports = router;
