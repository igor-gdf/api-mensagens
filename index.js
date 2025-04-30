// index.js
const express = require('express');
const Mensagem = require('./models/mensagem');
const sequelize = require('./db');

const app = express();
app.use(express.json());

// Sincronizando o banco de dados
sequelize.sync().then(() => console.log('Banco de dados sincronizado.'));

app.post('/mensagens', async (req, res) => {
  try {
    const { conteudo } = req.body;
    const novaMensagem = await Mensagem.create({ conteudo });
    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar mensagem.' });
  }
});

//rotas

app.get('/mensagens', async (req, res) => {
  try {
    const mensagens = await Mensagem.findAll();
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar mensagens.' });
  }
});

app.get('/mensagens/:id', async (req, res) => {
  try {
    const mensagem = await Mensagem.findByPk(req.params.id);
    if (mensagem) {
      res.json(mensagem);
    } else {
      res.status(404).json({ error: 'Mensagem não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter mensagem.' });
  }
});

app.put('/mensagens/:id', async (req, res) => {
  try {
    const { conteudo } = req.body;
    const mensagem = await Mensagem.findByPk(req.params.id);

    if (mensagem) {
      mensagem.conteudo = conteudo;
      await mensagem.save();
      res.json(mensagem);
    } else {
      res.status(404).json({ error: 'Mensagem não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar mensagem.' });
  }
});

app.delete('/mensagens/:id', async (req, res) => {
  try {
    const mensagem = await Mensagem.findByPk(req.params.id);
    if (mensagem) {
      await mensagem.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Mensagem não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar mensagem.' });
  }
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
