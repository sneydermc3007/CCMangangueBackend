const express = require('express');
const router = express.Router();
const { 
  createEvento, 
  getEventoById, 
  getAllEventos, 
  updateEvento, 
  deleteEvento 
} = require('../controllers/eventosCalendarioController');

router.post('/eventos', createEvento);
router.get('/eventos/:id', getEventoById);
router.get('/', getAllEventos);
router.put('/eventos/:id', updateEvento);
router.delete('/eventos/:id', deleteEvento);

module.exports = router;
