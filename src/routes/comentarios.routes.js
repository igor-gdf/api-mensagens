const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');
const ComentarioController = require('../controllers/ComentarioController');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', ComentarioController.create);
router.get('/mensagem/:mensagemId', ComentarioController.listByMensagem);
router.delete('/:id', ComentarioController.delete);

module.exports = router;