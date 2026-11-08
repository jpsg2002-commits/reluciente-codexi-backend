const db = require('../config/db');

// Función para VER colaboradores (GET)
const obtenerColaboradores = async (req, res) => {
    try {
        const [colaboradores] = await db.query('SELECT * FROM colaboradores');
        res.json(colaboradores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Función para CREAR colaborador (POST)
const crearColaborador = async (req, res) => {
    try {
        const { nombre, telefono, especialidad, estado } = req.body;
        const [resultado] = await db.query(
            'INSERT INTO colaboradores (nombre, telefono, especialidad, estado) VALUES (?, ?, ?, ?)',
            [nombre, telefono, especialidad, estado || 'Disponible']
        );
        res.status(201).json({ id: resultado.insertId, nombre, telefono, especialidad, estado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear el colaborador" });
    }
};

// Función para ACTUALIZAR colaborador (PUT) - NUEVA
const actualizarColaborador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, especialidad, estado } = req.body;
        
        await db.query(
            'UPDATE colaboradores SET nombre = ?, telefono = ?, especialidad = ?, estado = ? WHERE id = ?',
            [nombre, telefono, especialidad, estado, id]
        );
        res.json({ mensaje: "Colaborador actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el colaborador" });
    }
};

// Función para ELIMINAR colaborador (DELETE) - NUEVA
const eliminarColaborador = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM colaboradores WHERE id = ?', [id]);
        res.json({ mensaje: "Colaborador eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar el colaborador" });
    }
};

module.exports = {
    obtenerColaboradores,
    crearColaborador,
    actualizarColaborador,
    eliminarColaborador
};