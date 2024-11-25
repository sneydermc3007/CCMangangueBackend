const express = require('express');
const router = express.Router();

const { createAcordeon } = require('../controllers/acordeonesController');

router.post('/', createAcordeon);

module.exports = router;