API Mensagens

API RESTful construída com Node.js, Express e Sequelize, utilizando SQLite como banco de dados.

Como executar a API

1. Clone o repositório:

git clone <url-do-repositorio>
cd api-vicente

2. Instale as dependências:

npm install

4. Inicie a API:

node src/server.js

5. A API estará disponível em:

http://localhost:3000

Ou, se estiver rodando no GitHub Codespaces, acesse pela URL gerada automaticamente.


Endpoints disponíveis

| Método | Rota             | Descrição                      |
| ------ | ---------------- | -------------------------------|
| POST   | /mensagens     | Criar uma nova mensagem          |
| GET    | /mensagens     | Listar todas as mensagens        |
| GET    | /mensagens/:id | Buscar uma mensagem por ID       |
| PUT    | /mensagens/:id | Atualizar o conteúdo da mensagem |
| DELETE | /mensagens/:id | Deletar uma mensagem             |
obs: configurar segurança para ataques de força bruta denifinir ip do front como o unico que pode acessar o back E ADICONAR SCHEMAS
