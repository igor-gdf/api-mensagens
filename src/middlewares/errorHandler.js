//errorHandler
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || 'MSG003';
  const message = err.message || 'Erro interno ao processar a requisição.';

  console.error(err); // Log interno

  res.status(status).json({
    error: message,
    code
  });
};
