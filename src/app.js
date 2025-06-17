// app.js
const express = require('express');
const passport = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const createError = require('http-errors');

const mensagensRoutes = require('./routes/mensagens.routes');
const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');


const app = express();

app.use(express.json());
app.use(passport.initialize());


app.use('/auth', authRoutes);
app.use('/mensagens', mensagensRoutes);
app.use('/usuarios', usuariosRoutes);


app.use((req, res, next) => {
  next(createError(404, 'Rota não encontrada.'));
});
app.use(errorHandler);

module.exports = app;