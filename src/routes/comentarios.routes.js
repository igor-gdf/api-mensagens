// routes/comentarios.js
const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');
const ComentarioController = require('../controllers/ComentarioController');
const validate = require('../middlewares/validate');
const { comentarioSchema } = require('../schemas/comentarioSchema');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', validate(comentarioSchema), ComentarioController.create);
router.get('/mensagem/:mensagemId', ComentarioController.listByMensagem);
router.delete('/:id', ComentarioController.delete);

module.exports = router;
