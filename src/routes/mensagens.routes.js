const express = require('express');
const router = express.Router();
const MensagemController = require('../controllers/MensagemController');
const passport = require('passport');
const loadMensagem = require('../middlewares/loadMensagem');
const checkOwnerOrAdminMensagem = require('../middlewares/checkOwnerOrAdminMensagem');
const prohibitAutorChangeMensagem = require('../middlewares/prohibitAutorChangeMensagem');

router.post('/', passport.authenticate('jwt', { session: false }), MensagemController.create);
router.get('/', MensagemController.list);
router.get('/:id', loadMensagem, MensagemController.getById);
router.put('/:id', passport.authenticate('jwt', { session: false }), loadMensagem, checkOwnerOrAdminMensagem, prohibitAutorChangeMensagem, MensagemController.update);
router.patch('/:id', passport.authenticate('jwt', { session: false }), loadMensagem, checkOwnerOrAdminMensagem, prohibitAutorChangeMensagem, MensagemController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), loadMensagem, checkOwnerOrAdminMensagem, MensagemController.delete);

module.exports = router;
