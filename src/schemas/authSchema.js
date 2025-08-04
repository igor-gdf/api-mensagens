// schemas/authSchema.js
const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido.',
    'string.empty': 'Email é obrigatório.'
  }),
  senha: Joi.string().required().messages({
    'string.empty': 'Senha é obrigatória.'
  })
});

module.exports = authSchema;
