// app.js
const express = require('express');
const mensagensRoutes = require('./routes/mensagens.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.use('/mensagens', mensagensRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada.',
    code: 'ROUTE404'
  });
});

app.use(errorHandler);

module.exports = app;

