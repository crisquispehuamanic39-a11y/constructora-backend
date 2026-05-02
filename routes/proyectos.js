const express = require('express');
const router = express.Router();
const Proyecto = require('../models/Proyecto');

// GET - Obtener todos los proyectos
router.get('/', async (req, res) => {
    const proyectos = await Proyecto.find().sort({ fechaCreacion: -1 });
    res.json(proyectos);
});

// POST - Crear proyecto
router.post('/', async (req, res) => {
    try {
        const nuevo = new Proyecto(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT - Actualizar proyecto
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Proyecto.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Eliminar proyecto
router.delete('/:id', async (req, res) => {
    try {
        await Proyecto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Proyecto eliminado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;