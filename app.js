require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');


// Habilitar CORS para todas las rutas y orígenes
app.use(cors());
app.use(express.json());


// Rutas
const rutas = require('./routes/routes');
app.use('/api', rutas);
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Sistema de gestión de laboratorio' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no capturado:', err);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// Puerto
const PORT = process.env.PORT || 10000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
