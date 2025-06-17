// routes/mensagens.js
const express = require('express');
const router = express.Router();
const MensagemController = require('../controllers/MensagemController');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', MensagemController.create);
router.get('/', MensagemController.list);
router.get('/:id', MensagemController.getById);
router.put('/:id', MensagemController.update);
router.delete('/:id', MensagemController.delete);

module.exports = router;

