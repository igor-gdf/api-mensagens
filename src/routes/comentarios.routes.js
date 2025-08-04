const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('../middlewares/auth');
const ComentarioController = require('../controllers/ComentarioController');
const validate = require('../middlewares/validate');
const comentarioSchema = require('../schemas/comentarioSchema');
const loadComentario = require('../middlewares/loadComentario');
const checkOwnerOrAdminComentario = require('../middlewares/checkOwnerOrAdminComentario');
const prohibitAutorChangeComentario = require('../middlewares/prohibitAutorChangeComentario');

router.get('/', ComentarioController.listByMensagem);
router.post('/', passport.authenticate('jwt', { session: false }), validate(comentarioSchema), ComentarioController.create);
router.put('/:id_comentario', passport.authenticate('jwt', { session: false }), loadComentario, checkOwnerOrAdminComentario, prohibitAutorChangeComentario, validate(comentarioSchema), ComentarioController.update);
router.delete('/:id_comentario', passport.authenticate('jwt', { session: false }), loadComentario, checkOwnerOrAdminComentario, ComentarioController.delete);

module.exports = router;
