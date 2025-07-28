const Joi = require('joi');

const mensagemSchema = Joi.object({
  conteudo: Joi.string().min(1).required().messages({
    'string.empty': 'Conteúdo da mensagem é obrigatório.'
  }),
  autorId: Joi.number().integer().positive().required().messages({
    'number.base': 'ID do autor deve ser um número válido.'
  })
});

module.exports = mensagemSchema;
