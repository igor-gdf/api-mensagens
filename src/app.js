// app.js
const express = require('express');
const passport = require('./middlewares/auth');
const mensagensRoutes = require('./routes/mensagens.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(passport.initialize());
const usuariosRoutes = require('./routes/usuarios.routes');

app.use('/auth', authRoutes);
app.use('/mensagens', mensagensRoutes);
app.use('/usuarios', usuariosRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.', code: 'ROUTE404' });
});
app.use(errorHandler);

module.exports = app;