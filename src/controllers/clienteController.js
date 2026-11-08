const db = require('../config/db');

// Función para VER clientes (GET)
const obtenerClientes = async (req, res) => {
    try {
        const [clientes] = await db.query('SELECT * FROM clientes');
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener los clientes" });
    }
};

// Función para CREAR cliente (POST)
const crearCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono, direccion } = req.body;
        const [resultado] = await db.query(
            'INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)',
            [nombre, correo, telefono, direccion]
        );
        res.status(201).json({ id: resultado.insertId, nombre, correo, telefono, direccion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear el cliente" });
    }
};

// Función para ACTUALIZAR cliente (PUT)
const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono, direccion } = req.body;
        
        await db.query(
            'UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id = ?',
            [nombre, correo, telefono, direccion, id]
        );
        res.json({ mensaje: "Cliente actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el cliente" });
    }
};

// Función para ELIMINAR cliente (DELETE)
const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar el cliente" });
    }
};

module.exports = {
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};