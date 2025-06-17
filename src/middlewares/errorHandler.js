module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro interno ao processar a requisição.';

  console.error(`[${new Date().toISOString()}]`, err);

  res.status(status).json({
    error: message
  });
};
