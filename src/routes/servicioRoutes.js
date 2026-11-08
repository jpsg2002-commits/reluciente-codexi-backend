const express = require('express');
const router = express.Router();

// Importamos el controlador (con minúscula, como lo corregimos ayer)
const servicioController = require('../controllers/serviciocontroller'); 

router.get('/', servicioController.obtenerServicios);
router.post('/', servicioController.crearServicio);

// Nuevas rutas requiriendo el ID del servicio a modificar
router.put('/:id', servicioController.actualizarServicio);
router.delete('/:id', servicioController.eliminarServicio);

module.exports = router;