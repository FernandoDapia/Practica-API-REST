const express = require('express');
const router = express.Router();
const {
  getAllPeliculas,
  getPeliculaById,
  getPeliculasByGenero,
  getPeliculasByDirector,
  createPelicula,
  updatePelicula,
  deletePelicula
} = require('../api/controllers/pelicula-controlles.js');

// GET
router.get('/', getAllPeliculas);
router.get('/genero/:genero', getPeliculasByGenero);
router.get('/director/:director', getPeliculasByDirector);
router.get('/:id', getPeliculaById);

// POST
router.post('/', createPelicula);

// PUT
router.put('/:id', updatePelicula);

// DELETE
router.delete('/:id', deletePelicula);

module.exports = router;