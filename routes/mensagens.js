// routes/mensagens.js
const express = require('express');
const router = express.Router();
const Mensagem = require('../models/mensagem');

// Código de erro padrão personalizado
const ERROR_CODES = {
  EMPTY_CONTENT: 'MSG001',
  NOT_FOUND: 'MSG002',
  SERVER_ERROR: 'MSG003',
};

// Criar nova mensagem
router.post('/', async (req, res) => {
  try {
    const { conteudo } = req.body;

    if (!conteudo || conteudo.trim() === '') {
      return res.status(400).json({
        error: 'O campo "conteudo" não pode estar vazio.',
        code: ERROR_CODES.EMPTY_CONTENT,
      });
    }

    const novaMensagem = await Mensagem.create({ conteudo });
    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno ao criar a mensagem.',
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
});

// Listar todas as mensagens
router.get('/', async (req, res) => {
  try {
    const mensagens = await Mensagem.findAll();
    res.json(mensagens);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao listar mensagens.',
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
});

// Buscar uma mensagem por ID
router.get('/:id', async (req, res) => {
  try {
    const mensagem = await Mensagem.findByPk(req.params.id);

    if (!mensagem) {
      return res.status(404).json({
        error: 'Mensagem não encontrada.',
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    res.json(mensagem);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar mensagem.',
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
});

// Atualizar uma mensagem
router.put('/:id', async (req, res) => {
  try {
    const { conteudo } = req.body;

    if (!conteudo || conteudo.trim() === '') {
      return res.status(400).json({
        error: 'O campo "conteudo" não pode estar vazio.',
        code: ERROR_CODES.EMPTY_CONTENT,
      });
    }

    const mensagem = await Mensagem.findByPk(req.params.id);

    if (!mensagem) {
      return res.status(404).json({
        error: 'Mensagem não encontrada.',
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    mensagem.conteudo = conteudo;
    await mensagem.save();

    res.json(mensagem);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao atualizar mensagem.',
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
});

// Deletar uma mensagem
router.delete('/:id', async (req, res) => {
  try {
    const mensagem = await Mensagem.findByPk(req.params.id);

    if (!mensagem) {
      return res.status(404).json({
        error: 'Mensagem não encontrada.',
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    await mensagem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao deletar mensagem.',
      code: ERROR_CODES.SERVER_ERROR,
    });
  }
});

module.exports = router;
