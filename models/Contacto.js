const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: String,
    mensaje: String,
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contacto', contactoSchema);