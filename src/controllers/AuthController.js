// AuthController.js
const AuthService = require('../services/AuthService.js');

module.exports = {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const access_token = await AuthService.login(email, senha);
      res.json(access_token);
    } catch (err) {
      next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const tokens = await AuthService.refresh(refreshToken);
      res.json(tokens);
    } catch (err) {
      next(err);
    }
  }
};
