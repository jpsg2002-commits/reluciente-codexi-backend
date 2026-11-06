const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const db = require('./src/config/db');

// Middlewares (Configuraciones de seguridad y formato)
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de Reluciente Codexi funcionando correctamente');
});

// Configuración del puerto

// Probar conexión a la base de datos
db.getConnection()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch((err) => console.error('Error conectando a la base de datos:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});