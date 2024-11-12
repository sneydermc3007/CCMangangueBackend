const express = require('express');
const router = express.Router();

const { createSlide, getSlideById, updateSlide, deleteSlide, getAllSlides } = require('../controllers/slidesController');

router.post('/', createSlide);     
router.get('/:id', getSlideById);
router.put('/:id', updateSlide);
router.delete('/:id', deleteSlide);
router.get('/', getAllSlides);

module.exports = router;
