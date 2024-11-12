const express = require('express');
const router = express.Router();
const { crearVideo, obtenerVideos, actualizarVideo } = require('../controllers/videosController');

router.get('/', obtenerVideos);
router.post('/crear', crearVideo);
router.put('/:id', actualizarVideo);

module.exports = router;
