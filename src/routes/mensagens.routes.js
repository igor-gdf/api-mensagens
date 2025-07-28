// routes/mensagens.js
const express = require('express');
const router = express.Router();
const MensagemController = require('../controllers/MensagemController');
const passport = require('passport');
const { mensagemSchema } = require('../schemas/mensagemSchema');
const validate = require('../middlewares/validate');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', validate(mensagemSchema), MensagemController.create);
router.get('/', MensagemController.list);
router.get('/:id', MensagemController.getById);
router.put('/:id', validate(mensagemSchema), MensagemController.update);
router.delete('/:id', MensagemController.delete);

module.exports = router;

