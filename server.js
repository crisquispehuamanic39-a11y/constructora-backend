require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal - sirve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conectar a MongoDB
console.log('📡 Conectando a MongoDB...');
console.log('📍 URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB exitosamente');
        console.log('📦 Base de datos:', mongoose.connection.name);
    })
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:');
        console.error('📝 Mensaje:', err.message);
    });

// Rutas de API
app.use('/api/contactos', require('./routes/contactos'));
app.use('/api/proyectos', require('./routes/proyectos'));

// Para cualquier otra ruta que no sea API, devolver index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});