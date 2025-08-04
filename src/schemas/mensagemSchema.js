const Joi = require('joi');

const mensagemSchema = Joi.object({
  titulo: Joi.string().min(1).required().messages({
    'string.empty': 'Título é obrigatório.'
  }),
  conteudo: Joi.string().min(1).required().messages({
    'string.empty': 'Conteúdo da mensagem é obrigatório.'
  })
});



module.exports = mensagemSchema;
