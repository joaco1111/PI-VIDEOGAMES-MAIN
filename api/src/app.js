const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const { sequelize } = require('./models');
sequelize.sync({ force: false }) // Utiliza { force: true } para recrear las tablas en cada reinicio (en desarrollo)
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('Error en la conexión a la base de datos:', err);
  });

// Rutas
const videogamesRoutes = require('./routes/videogames');
const genresRoutes = require('./routes/genres');

app.use('/videogames', videogamesRoutes);
app.use('/genres', genresRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Videojuegos');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
