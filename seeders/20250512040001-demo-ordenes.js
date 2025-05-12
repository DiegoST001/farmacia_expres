'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrdenCompras', [
      {
        fechaEmision: new Date('2025-05-10'),
        Situacion: 'Pendiente',
        Total: 1500.50,
        CodLab: 1,
        NroFacturaProv: 'FAC-001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fechaEmision: new Date('2025-05-11'),
        Situacion: 'Pagada',
        Total: 2500.00,
        CodLab: 2,
        NroFacturaProv: 'FAC-002',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrdenCompras', null, {});
  }
};
