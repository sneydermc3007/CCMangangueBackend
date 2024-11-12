const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config({ path: './env/.env' });

const app = express();
const port = process.env.PORT || 3001;
const noticiasRouter = require('./routes/noticias');

app.use('/noticias', noticiasRouter);

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
