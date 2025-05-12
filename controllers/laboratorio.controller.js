const { Laboratorio, OrdenCompra } = require('../models');

// Obtener todos los laboratorios
exports.getAll = async (req, res) => {
  const labs = await Laboratorio.findAll({ include: 'ordenesCompra' });
  res.json(labs);
};

// Obtener un laboratorio por CodLab
exports.getById = async (req, res) => {
  const lab = await Laboratorio.findByPk(req.params.id, { include: 'ordenesCompra' });
  if (!lab) return res.status(404).json({ mensaje: 'No encontrado' });
  res.json(lab);
};

// Crear laboratorio
exports.create = async (req, res) => {
  const { razonSocial, direccion, telefono, email, contacto } = req.body;
  const lab = await Laboratorio.create({ razonSocial, direccion, telefono, email, contacto });
  res.status(201).json(lab);
};

// Actualizar laboratorio
exports.update = async (req, res) => {
  const lab = await Laboratorio.findByPk(req.params.id);
  if (!lab) return res.status(404).json({ mensaje: 'No encontrado' });
  const { razonSocial, direccion, telefono, email, contacto } = req.body;
  await lab.update({ razonSocial, direccion, telefono, email, contacto });
  res.json(lab);
};

// Eliminar laboratorio
exports.remove = async (req, res) => {
  const lab = await Laboratorio.findByPk(req.params.id);
  if (!lab) return res.status(404).json({ mensaje: 'No encontrado' });
  await lab.destroy();
  res.json({ mensaje: 'Eliminado' });
};
