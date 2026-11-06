const express = require('express');
const router = express.Router();

// Importamos el controlador
const servicioController = require('../controllers/serviciocontroller'); 

// Ruta para VER los servicios (GET)
router.get('/', servicioController.obtenerServicios);

// Ruta para CREAR un nuevo servicio (POST) - ¡Esta es la que faltaba!
router.post('/', servicioController.crearServicio);

module.exports = router;