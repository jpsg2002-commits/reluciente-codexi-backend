const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const db = require('./src/config/db');

// Middlewares (Configuraciones de seguridad y formato)
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Importar rutas de Reluciente Codexi
const servicioRoutes = require('./src/routes/servicioRoutes');
const colaboradorRoutes = require('./src/routes/colaboradorRoutes'); 
const clienteRoutes = require('./src/routes/clienteRoutes'); 
const reservaRoutes = require('./src/routes/reservaRoutes'); // NUEVA

// Usar las rutas
app.use('/api/servicios', servicioRoutes);
app.use('/api/colaboradores', colaboradorRoutes); 
app.use('/api/clientes', clienteRoutes); 
app.use('/api/reservas', reservaRoutes); // NUEVA

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