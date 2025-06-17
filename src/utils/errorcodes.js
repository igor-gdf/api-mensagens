//erroscode.js
module.exports = {
  EMPTY_CONTENT: {
    status: 400,
    code: 'MSG001',
    message: 'O campo "conteudo" não pode estar vazio.'
  },
  NOT_FOUND: {
    status: 404,
    code: 'MSG002',
    message: 'Mensagem não encontrada.'
  },
  SERVER_ERROR: {
    status: 500,
    code: 'MSG003',
    message: 'Erro interno ao processar a requisição.'
  },
  INVALID_ID: {
    status: 400,
    code: 'MSG004',
    message: 'ID da mensagem inválido.'
  }
};
