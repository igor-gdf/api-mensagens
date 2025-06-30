// routes/comentarios.js
const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');
const ComentarioController = require('../controllers/ComentarioController');

router.post('/', passport.authenticate('jwt', { session: false }), ComentarioController.create);
router.get('/mensagem/:mensagemId', ComentarioController.listByMensagem);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ComentarioController.delete);

module.exports = router;