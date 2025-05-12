const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { verificarToken, permitirRoles } = require('../middleware');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) return res.status(400).json({ mensaje: 'Credenciales inválidas' });
  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(400).json({ mensaje: 'Credenciales inválidas' });
  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });
  res.json({ token, rol: usuario.rol });
});

// Controladores
const laboratorioCtrl = require('../controllers/laboratorio.controller');
const ordenCompraCtrl = require('../controllers/ordencompra.controller');

// --- Rutas Laboratorio ---
// Ver todos (todos los roles)
router.get('/laboratorios', verificarToken, permitirRoles('admin', 'moderador', 'usuario'), laboratorioCtrl.getAll);
// Ver uno (todos los roles)
router.get('/laboratorios/:id', verificarToken, permitirRoles('admin', 'moderador', 'usuario'), laboratorioCtrl.getById);
// Crear (solo admin)
router.post('/laboratorios', verificarToken, permitirRoles('admin'), laboratorioCtrl.create);
// Editar (admin y moderador)
router.put('/laboratorios/:id', verificarToken, permitirRoles('admin', 'moderador'), laboratorioCtrl.update);
// Eliminar (solo admin)
router.delete('/laboratorios/:id', verificarToken, permitirRoles('admin'), laboratorioCtrl.remove);

// --- Rutas OrdenCompra ---
// Ver todos (todos los roles)
router.get('/ordenes', verificarToken, permitirRoles('admin', 'moderador', 'usuario'), ordenCompraCtrl.getAll);
// Ver uno (todos los roles)
router.get('/ordenes/:id', verificarToken, permitirRoles('admin', 'moderador', 'usuario'), ordenCompraCtrl.getById);
// Crear (solo admin)
router.post('/ordenes', verificarToken, permitirRoles('admin'), ordenCompraCtrl.create);
// Editar (admin y moderador)
router.put('/ordenes/:id', verificarToken, permitirRoles('admin', 'moderador'), ordenCompraCtrl.update);
// Eliminar (solo admin)
router.delete('/ordenes/:id', verificarToken, permitirRoles('admin'), ordenCompraCtrl.remove);

// Registro de usuario (solo admin puede crear usuarios)
router.post('/usuarios', verificarToken, permitirRoles('admin'), async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const existe = await Usuario.findOne({ where: { email } });
  if (existe) return res.status(400).json({ mensaje: 'El email ya está registrado' });
  const hash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, password: hash, rol });
  res.status(201).json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol });
});

module.exports = router;
