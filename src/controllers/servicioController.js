const db = require('../config/db');

// Función para obtener todo el catálogo de servicios (HU-01) - GET
const obtenerServicios = async (req, res) => {
    try {
        const [servicios] = await db.query('SELECT * FROM servicios');
        res.json(servicios);
    } catch (error) {
        console.error("Error obteniendo servicios:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Función para crear un nuevo servicio (HU-05 Administrador) - POST
const crearServicio = async (req, res) => {
    try {
        const { nombre, descripcion, precio, duracion_horas } = req.body;
        
        const [resultado] = await db.query(
            'INSERT INTO servicios (nombre, descripcion, precio, duracion_horas) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, duracion_horas]
        );
        
        res.status(201).json({ 
            id: resultado.insertId, 
            nombre, 
            descripcion, 
            precio, 
            duracion_horas 
        });
    } catch (error) {
        console.error("Error creando servicio:", error);
        res.status(500).json({ mensaje: "Error al crear el servicio" });
    }
};

module.exports = {
    obtenerServicios,
    crearServicio
};