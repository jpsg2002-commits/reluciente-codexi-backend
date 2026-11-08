const db = require('../config/db');

// Función para VER servicios (GET)
const obtenerServicios = async (req, res) => {
    try {
        const [servicios] = await db.query('SELECT * FROM servicios');
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Función para CREAR servicio (POST)
const crearServicio = async (req, res) => {
    try {
        const { nombre, descripcion, precio, duracion_horas } = req.body;
        const [resultado] = await db.query(
            'INSERT INTO servicios (nombre, descripcion, precio, duracion_horas) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, duracion_horas]
        );
        res.status(201).json({ id: resultado.insertId, nombre, descripcion, precio, duracion_horas });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el servicio" });
    }
};

// Función para ACTUALIZAR servicio (PUT) - NUEVO
const actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params; // Extraemos el ID de la URL
        const { nombre, descripcion, precio, duracion_horas } = req.body;
        
        await db.query(
            'UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, duracion_horas = ? WHERE id = ?',
            [nombre, descripcion, precio, duracion_horas, id]
        );
        res.json({ mensaje: "Servicio actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el servicio" });
    }
};

// Función para ELIMINAR servicio (DELETE) - NUEVO
const eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params; // Extraemos el ID de la URL
        await db.query('DELETE FROM servicios WHERE id = ?', [id]);
        res.json({ mensaje: "Servicio eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar el servicio" });
    }
};

module.exports = {
    obtenerServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
};