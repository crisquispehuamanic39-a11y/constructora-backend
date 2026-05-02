const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: String,
    imagenUrl: String,
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);