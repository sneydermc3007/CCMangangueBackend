const express = require('express');
const router = express.Router();

const { getAllAcordeons, createAcordeon, updateAcordeon, deleteAcordeon } = require('../controllers/acordeonesController');

router.get('/', getAllAcordeons);
router.post('/', createAcordeon);
router.put('/:id', updateAcordeon);
router.delete('/:id', deleteAcordeon);

module.exports = router;