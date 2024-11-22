const express = require('express');
const { body, query } = require('express-validator');

const router = express.Router();
const { crearNoticia, obtenerNoticias, obtenerNoticiaPorId, actualizarNoticia, eliminarNoticia } = require('../controllers/noticiasController');

router.get(
    '/',
    [query('tipo').optional().isIn(['Principal', 'Secundaria']).withMessage('El tipo debe ser Principal o Secundaria')],
    obtenerNoticias
);

router.get('/:id', obtenerNoticiaPorId);

router.post(
    '/crear',
    [ body('tipo').optional().isIn(['Principal', 'Secundaria']).withMessage('El tipo debe ser Principal o Secundaria')],
    crearNoticia
);
  
router.put('/:id', actualizarNoticia);

router.delete('/:id', eliminarNoticia);

module.exports = router;
