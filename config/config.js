require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,  // Habilitar SSL
        rejectUnauthorized: false, // Deshabilitar validación de certificado
      }
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL',  // Usar la variable de entorno para la URL completa de la base de datos
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,  // Habilitar SSL
        rejectUnauthorized: false, // Deshabilitar validación de certificado
      }
    }
  }
};
  