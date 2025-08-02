const express = require('express');
const router = express.Router();
const MensagemController = require('../controllers/MensagemController');
const passport = require('passport');
const { mensagemSchema, mensagemParcialSchema } = require('../schemas/mensagemSchema');
const validate = require('../middlewares/validate');
const comentariosRoutes = require('./comentarios.routes'); // Importa sub-rotas

// CRUD de mensagens
router.post('/', validate(mensagemSchema), passport.authenticate('jwt', { session: false }), MensagemController.create);
router.get('/', MensagemController.list);
router.get('/:id', passport.authenticate('jwt', { session: false }), MensagemController.getById);
router.put('/:id', validate(mensagemSchema), passport.authenticate('jwt', { session: false }), MensagemController.update);
router.patch('/:id', validate(mensagemParcialSchema), passport.authenticate('jwt', { session: false }), MensagemController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), MensagemController.delete);

// Sub-recurso: comentários da mensagem
router.use('/:id/comentarios', comentariosRoutes);

module.exports = router;
