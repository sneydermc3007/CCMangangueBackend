const Convocatoria = require('../models/Convocatoria');

module.exports = {
    async createConvocatoria(req, res) {
        try {
            const convocatoria = await Convocatoria.create(req.body);
            res.status(201).json(convocatoria);
        } catch (error) {
            console.error('Error al crear convocatoria:', error);
            res.status(500).json({ error: 'Error al crear convocatoria' });
        }
    },

    async getConvocatoriaById(req, res) {
        try {
            const id = req.params.id;
            const convocatoria = await Convocatoria.findByPk(id);

            if (!convocatoria) {
                return res.status(404).json({ error: 'Convocatoria no encontrada' });
            }

            res.json(convocatoria);
        } catch (error) {
            console.error('Error al obtener convocatoria:', error);
            res.status(500).json({ error: 'Error al obtener convocatoria' });
        }
    },

    async getAllConvocatorias(req, res) {
        try {
            const convocatorias = await Convocatoria.findAll();
            res.json(convocatorias);
        } catch (error) {
            console.error('Error al listar convocatorias:', error);
            res.status(500).json({ error: 'Error al listar convocatorias' });
        }
    },

    async updateConvocatoria(req, res) {
        try {
            const id = req.params.id;
            const [updated] = await Convocatoria.update(req.body, {
                where: { id }
            });

            if (!updated) {
                return res.status(404).json({ error: 'Convocatoria no encontrada' });
            }

            const updatedConvocatoria = await Convocatoria.findByPk(id);
            res.json(updatedConvocatoria);
        } catch (error) {
            console.error('Error al actualizar convocatoria:', error);
            res.status(500).json({ error: 'Error al actualizar convocatoria' });
        }
    },

    async deleteConvocatoria(req, res) {
        try {
            const id = req.params.id;
            const deleted = await Convocatoria.destroy({
                where: { id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Convocatoria no encontrada' });
            }

            res.json({ message: 'Convocatoria eliminada exitosamente' });
        } catch (error) {
            console.error('Error al eliminar convocatoria:', error);
            res.status(500).json({ error: 'Error al eliminar convocatoria' });
        }
    }
};