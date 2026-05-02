const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto');

// POST - Guardar contacto
router.post('/', async (req, res) => {
    try {
        const nuevoContacto = new Contacto(req.body);
        await nuevoContacto.save();
        res.status(201).json({ mensaje: 'Contacto guardado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET - Obtener todos los contactos
router.get('/', async (req, res) => {
    const contactos = await Contacto.find().sort({ fecha: -1 });
    res.json(contactos);
});

module.exports = router;