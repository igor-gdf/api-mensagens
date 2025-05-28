// index.js
const express = require('express');
const sequelize = require('./db');
const mensagensRoutes = require('./routes/mensagens');

const app = express();
app.use(express.json());

// Sincronização com o banco de dados
sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado.'))
  .catch((err) => console.error('Erro ao sincronizar banco de dados:', err));

// Rotas
app.use('/mensagens', mensagensRoutes);

// Rota fallback
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada.',
    code: 'ROUTE404'
  });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
