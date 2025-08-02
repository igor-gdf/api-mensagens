//usuario.routes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const passport = require('passport');
const validate = require('../middlewares/validate');
const { usuarioSchema } = require('../schemas/usuarioSchema');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.post('/', validate(usuarioSchema), UsuarioController.create);
router.get('/', UsuarioController.list);

router.get('/:id', passport.authenticate('jwt', { session: false }), UsuarioController.getById);
router.patch ('/:id', validate(usuarioSchema), passport.authenticate('jwt', { session: false }), UsuarioController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), UsuarioController.delete);

module.exports = router;