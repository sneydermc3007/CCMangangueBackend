const express = require('express');
const router = express.Router();
const { 
  createDecreto, 
  getDecretoById, 
  getAllDecretos, 
  updateDecreto, 
  deleteDecreto 
} = require('../controllers/decretosController');

router.post('/crear', createDecreto);
router.get('/:id', getDecretoById);
router.get('/', getAllDecretos);
router.put('/:id', updateDecreto);
router.delete('/:id', deleteDecreto);

module.exports = router;
