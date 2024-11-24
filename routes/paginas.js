const express = require('express');
const router = express.Router();
const PaginasController = require('../controllers/paginasController');

router.put('/:id', PaginasController.updatePagina);

module.exports = router;
