//validate.js
module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: 'Erro de validação.',
      detalhes: error.details.map((e) => e.message)
    });
  }
  next();
};
