'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Laboratorios', [
      {
        razonSocial: 'Laboratorio Central',
        direccion: 'Av. Principal 123',
        telefono: '987654321',
        email: 'central@lab.com',
        contacto: 'Juan Perez',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        razonSocial: 'Laboratorio Norte',
        direccion: 'Calle Norte 456',
        telefono: '912345678',
        email: 'norte@lab.com',
        contacto: 'Maria Lopez',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Laboratorios', null, {});
  }
};
