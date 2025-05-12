'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require('bcryptjs');
    const hashedAdmin = await bcrypt.hash('admin123', 10);
    const hashedMod = await bcrypt.hash('mod123', 10);
    const hashedUser = await bcrypt.hash('user123', 10);
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Administrador',
        email: 'admin@lab.com',
        password: hashedAdmin,
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Moderador',
        email: 'moderador@lab.com',
        password: hashedMod,
        rol: 'moderador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Usuario',
        email: 'usuario@lab.com',
        password: hashedUser,
        rol: 'usuario',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
