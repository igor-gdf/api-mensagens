const Joi = require('joi');

const usuarioSchema = Joi.object({
  nome: Joi.string().trim().min(3).required().messages({
    'string.empty': 'Nome é obrigatório.',
    'string.min': 'Nome deve ter no mínimo 3 caracteres.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido.',
    'string.empty': 'Email é obrigatório.'
  }),
  senha: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!%*?&]).{8,}$/)
    .required()
    .messages({
      'string.pattern.base': 'A senha deve ter no mínimo 8 caracteres, incluindo 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial (@!%*?&).',
      'string.empty': 'Senha é obrigatória.'
    })
});

module.exports = usuarioSchema;