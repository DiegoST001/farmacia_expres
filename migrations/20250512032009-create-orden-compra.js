'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrdenCompras', {
      NroOrdenC: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaEmision: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Situacion: {
        type: Sequelize.STRING
      },
      Total: {
        type: Sequelize.DECIMAL(10,2)
      },
      CodLab: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Laboratorios',
          key: 'CodLab'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      NroFacturaProv: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrdenCompras');
  }
};