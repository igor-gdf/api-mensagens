const { Mensagem } = require('../models');


module.exports = {
  async create(req, res, next) {
    try {
      const autorId = req.user.id;
      const { titulo, conteudo } = req.body;
      const novaMensagem = await Mensagem.create({ titulo, conteudo, usuario_id: autorId });


      const mensagemComAutor = await Mensagem.findByPk(novaMensagem.id, {
        include: ['autor', 'comentarios']
      });


      res.status(201).json(mensagemComAutor);
    } catch (error) {
      next(error);
    }
  },


  async list(req, res, next) {
    try {
      const mensagens = await Mensagem.findAll({
        include: ['autor', 'comentarios']
      });
      res.json(mensagens);
    } catch (error) {
      next(error);
    }
  },


  async getById(req, res, next) {
    try {
      // mensagem já está em req.mensagem carregada pelo middleware
      res.json(req.mensagem);
    } catch (error) {
      next(error);
    }
  },


  async update(req, res, next) {
    try {
      // Remove o campo 'editado' se enviado pelo usuário para impedir alteração manual
      if ('editado' in req.body) {
        delete req.body.editado;
      }
 
      const { titulo, conteudo } = req.body;
 
      if (titulo) req.mensagem.titulo = titulo;
      if (conteudo) req.mensagem.conteudo = conteudo;
 
      // Sempre que atualizar, marca editado como true
      req.mensagem.editado = true;
 
      await req.mensagem.save();
 
      res.json(req.mensagem);
    } catch (error) {
      next(error);
    }
  },
 
  async delete(req, res, next) {
    try {
      await req.mensagem.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};


