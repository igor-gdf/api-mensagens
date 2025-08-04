const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const passport = require('passport');
const validate = require('../middlewares/validate');
const usuarioSchema = require('../schemas/usuarioSchema');
const authorizeRoles = require('../middlewares/authorizeRoles');
const loadUsuario = require('../middlewares/loadUsuario');
const authorizeUserOrAdmin = require('../middlewares/authorizeUserOrAdmin');
const checkEmailUnique = require('../middlewares/checkEmailUnique');

router.post('/', validate(usuarioSchema), UsuarioController.create);
router.get('/', passport.authenticate('jwt', { session: false }), authorizeRoles('ADMIN'), UsuarioController.list);
router.get('/:id', passport.authenticate('jwt', { session: false }), UsuarioController.getById);
router.patch('/:id', passport.authenticate('jwt', { session: false }), loadUsuario, authorizeUserOrAdmin, validate(usuarioSchema), checkEmailUnique, UsuarioController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), authorizeRoles('ADMIN'), UsuarioController.delete);

module.exports = router;
