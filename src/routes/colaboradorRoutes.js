const express = require('express');
const router = express.Router();
const colaboradorController = require('../controllers/colaboradorController'); 

// Rutas base para colaboradores
router.get('/', colaboradorController.obtenerColaboradores);
router.post('/', colaboradorController.crearColaborador);

// Nuevas rutas requiriendo el ID del colaborador a modificar
router.put('/:id', colaboradorController.actualizarColaborador);
router.delete('/:id', colaboradorController.eliminarColaborador);

module.exports = router;