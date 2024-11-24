const express = require('express');
const router = express.Router();
const { 
  createDecreto, 
  getDecretoById, 
  getAllDecretos, 
  updateDecreto, 
  deleteDecreto 
} = require('../controllers/decretosController');

router.post('/decretos', createDecreto);
router.get('/decretos/:id', getDecretoById);
router.get('/', getAllDecretos);
router.put('/decretos/:id', updateDecreto);
router.delete('/decretos/:id', deleteDecreto);

module.exports = router;
