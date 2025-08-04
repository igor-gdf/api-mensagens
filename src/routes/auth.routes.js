// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const validate = require('../middlewares/validate');
const authSchema = require('../schemas/authSchema');

router.post('/login', validate(authSchema), AuthController.login);
router.post('/refresh', AuthController.refreshToken);

module.exports = router;
