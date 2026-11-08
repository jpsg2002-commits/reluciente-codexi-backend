const db = require('../config/db');

// Función para VER reservas (GET)
const obtenerReservas = async (req, res) => {
    try {
        const [reservas] = await db.query('SELECT * FROM reservas');
        res.json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener las reservas" });
    }
};

// Función para CREAR una reserva (POST)
const crearReserva = async (req, res) => {
    try {
        const { cliente_id, servicio_id, colaborador_id, fecha_reserva, hora_reserva, estado } = req.body;
        const [resultado] = await db.query(
            'INSERT INTO reservas (cliente_id, servicio_id, colaborador_id, fecha_reserva, hora_reserva, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [cliente_id, servicio_id, colaborador_id || null, fecha_reserva, hora_reserva, estado || 'Pendiente']
        );
        res.status(201).json({ id: resultado.insertId, cliente_id, servicio_id, colaborador_id, fecha_reserva, hora_reserva, estado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear la reserva" });
    }
};

// Función para ACTUALIZAR una reserva (PUT)
const actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { cliente_id, servicio_id, colaborador_id, fecha_reserva, hora_reserva, estado } = req.body;
        
        await db.query(
            'UPDATE reservas SET cliente_id = ?, servicio_id = ?, colaborador_id = ?, fecha_reserva = ?, hora_reserva = ?, estado = ? WHERE id = ?',
            [cliente_id, servicio_id, colaborador_id || null, fecha_reserva, hora_reserva, estado, id]
        );
        res.json({ mensaje: "Reserva actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar la reserva" });
    }
};

// Función para ELIMINAR una reserva (DELETE)
const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM reservas WHERE id = ?', [id]);
        res.json({ mensaje: "Reserva eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar la reserva" });
    }
};

module.exports = {
    obtenerReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva
};