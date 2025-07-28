// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const validate = require('../middlewares/validate');
const { authSchema } = require('../schemas/authSchema');

router.post('/auth', validate(authSchema), AuthController.login);

module.exports = router;
