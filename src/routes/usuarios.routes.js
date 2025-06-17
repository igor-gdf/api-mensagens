//usuario.routes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// CRUD
router.post('/', UsuarioController.create);
router.get('/', UsuarioController.list);
router.get('/:id', UsuarioController.getById);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);

module.exports = router;
