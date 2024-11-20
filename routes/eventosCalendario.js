const express = require('express');
const router = express.Router();
const { 
  createEvento, 
  getEventoById, 
  getAllEventos, 
  updateEvento, 
  deleteEvento 
} = require('../controllers/eventosCalendarioController');

router.post('/evento', createEvento);
router.get('/eventos/:id', getEventoById);
router.get('/', getAllEventos);
router.put('/eventos/:id', updateEvento);
router.delete('/evento/:id', deleteEvento);

module.exports = router;
