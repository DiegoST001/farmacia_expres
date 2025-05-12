'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenCompra extends Model {
    static associate(models) {
      OrdenCompra.belongsTo(models.Laboratorio, {
        foreignKey: 'CodLab',
        as: 'laboratorio',
      });
    }
  }
  OrdenCompra.init({
    NroOrdenC: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fechaEmision: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Situacion: DataTypes.STRING,
    Total: DataTypes.DECIMAL(10,2),
    CodLab: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NroFacturaProv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrdenCompra',
    tableName: 'OrdenCompras',
  });
  return OrdenCompra;
};