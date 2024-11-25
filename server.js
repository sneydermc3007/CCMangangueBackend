const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config({ path: './env/.env' });

const app = express();
const port = process.env.PORT || 3001;

const noticiasRouter = require('./routes/noticias');
const usuariosRouter = require('./routes/usuarios');
const videosRouter = require('./routes/videos');
const slidesRouter = require('./routes/slides');
const eventosCalendarioRouter = require('./routes/eventosCalendario');
const decretoRouter = require('./routes/decretos');
const paginasRouter = require('./routes/paginas');
const acordeonRouter = require('./routes/acordeon');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/noticias', noticiasRouter);
app.use('/usuarios', usuariosRouter);
app.use('/videos', videosRouter);
app.use('/slides', slidesRouter);
app.use('/eventos', eventosCalendarioRouter);
app.use('/decretos', decretoRouter);
app.use('/paginas', paginasRouter);
app.use('/acordeon', acordeonRouter);


app.get('/', (req, res) => {
  res.send('Hello World from Express');
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(port, () => console.log(`listening on http://localhost:${port}`));
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  }
);
