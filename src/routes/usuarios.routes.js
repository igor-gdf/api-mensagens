//usuario.routes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const passport = require('passport');
const validate = require('../middlewares/validate');
const { usuarioSchema } = require('../schemas/usuarioSchema');

router.post('/', validate(usuarioSchema), UsuarioController.create);

router.get('/', passport.authenticate('jwt', { session: false }), UsuarioController.list);
router.get('/:id', passport.authenticate('jwt', { session: false }), UsuarioController.getById);
router.put('/:id', passport.authenticate('jwt', { session: false }), UsuarioController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), UsuarioController.delete);

module.exports = router;