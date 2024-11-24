const Pagina = require('../models/Pagina');

module.exports = {
    async updatePagina(req, res) {
        try {
            const { id } = req.params;
            const { titulo, contenido, imagen_principal, imagen_segundaria } = req.body;

            const pagina = await Pagina.findByPk(id);

            if (!pagina)
                return res.status(404).json({ error: 'Página no encontrada' });

            await pagina.update({ titulo, contenido, imagen_principal, imagen_segundaria });
        
            res.status(200).json(pagina);
        } catch (error) {
            console.error('Error al actualizar la página:', error);
            res.status(500).json({ error: 'Error al actualizar la página' });
        }
    }
};