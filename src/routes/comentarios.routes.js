const express = require('express');
const router = express.Router({ mergeParams: true }); // Necessário para acessar :id da mensagem
const passport = require('../middlewares/auth');
const ComentarioController = require('../controllers/ComentarioController');
const validate = require('../middlewares/validate');
const { comentarioSchema } = require('../schemas/comentarioSchema');

// Rota pública
router.get('/', ComentarioController.listByMensagem);

// Rotas autenticadas
router.post('/', passport.authenticate('jwt', { session: false }), validate(comentarioSchema), ComentarioController.create);
router.put('/:id_comentario', passport.authenticate('jwt', { session: false }), ComentarioController.update);
router.delete('/:id_comentario', passport.authenticate('jwt', { session: false }), ComentarioController.delete);

module.exports = router;
