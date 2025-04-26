const express = require('express');
const router = express.Router();

const { createConvocatoria, getConvocatoriaById, updateConvocatoria, deleteConvocatoria, getAllConvocatorias } = require('../controllers/convocatoriasController');

router.post('/', createConvocatoria);
router.get('/:id', getConvocatoriaById);
router.put('/:id', updateConvocatoria);
router.delete('/:id', deleteConvocatoria);
router.get('/', getAllConvocatorias);

module.exports = router;