'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laboratorio extends Model {
    static associate(models) {
      Laboratorio.hasMany(models.OrdenCompra, {
        foreignKey: 'CodLab',
        as: 'ordenesCompra',
      });
    }
  }
  Laboratorio.init({
    CodLab: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    razonSocial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,
    contacto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Laboratorio',
    tableName: 'Laboratorios',
  });
  return Laboratorio;
};