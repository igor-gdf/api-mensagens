const Joi = require('joi');

const comentarioSchema = Joi.object({
  conteudo: Joi.string().min(1).required().messages({
    'string.empty': 'Conteúdo do comentário é obrigatório.'
  }),
  autorId: Joi.number().integer().positive().required(),
  mensagemId: Joi.number().integer().positive().required()
});

module.exports = comentarioSchema;
