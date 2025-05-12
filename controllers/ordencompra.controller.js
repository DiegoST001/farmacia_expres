const { OrdenCompra, Laboratorio } = require('../models');

// Obtener todas las ordenes de compra
exports.getAll = async (req, res) => {
  const ordenes = await OrdenCompra.findAll({ include: 'laboratorio' });
  res.json(ordenes);
};

// Obtener una orden por NroOrdenC
exports.getById = async (req, res) => {
  const orden = await OrdenCompra.findByPk(req.params.id, { include: 'laboratorio' });
  if (!orden) return res.status(404).json({ mensaje: 'No encontrado' });
  res.json(orden);
};

// Crear orden de compra
exports.create = async (req, res) => {
  const { fechaEmision, Situacion, Total, CodLab, NroFacturaProv } = req.body;
  const orden = await OrdenCompra.create({ fechaEmision, Situacion, Total, CodLab, NroFacturaProv });
  res.status(201).json(orden);
};

// Actualizar orden de compra
exports.update = async (req, res) => {
  const orden = await OrdenCompra.findByPk(req.params.id);
  if (!orden) return res.status(404).json({ mensaje: 'No encontrado' });
  const { fechaEmision, Situacion, Total, CodLab, NroFacturaProv } = req.body;
  await orden.update({ fechaEmision, Situacion, Total, CodLab, NroFacturaProv });
  res.json(orden);
};

// Eliminar orden de compra
exports.remove = async (req, res) => {
  const orden = await OrdenCompra.findByPk(req.params.id);
  if (!orden) return res.status(404).json({ mensaje: 'No encontrado' });
  await orden.destroy();
  res.json({ mensaje: 'Eliminado' });
};
