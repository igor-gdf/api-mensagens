# API Mensagens

Este projeto é uma API RESTful para envio, recebimento e gerenciamento de mensagens, hospedada em:  
https://api-mensagens-fq1p.onrender.com/

## Funcionalidades

- Cadastro e autenticação de usuários
- Envio de mensagens entre usuários
- Listagem de mensagens recebidas e enviadas
- Marcação de mensagens como lidas
- Exclusão de mensagens

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (ou outro banco de dados, conforme implementação)
- JWT para autenticação

## Como utilizar

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repositorio>
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente:**  
   Crie um arquivo `.env` com as configurações necessárias (exemplo: conexão com banco de dados, segredo JWT).

4. **Inicie a aplicação:**
   ```sh
   npm start
   ```

## Documentação da API

A documentação detalhada das rotas, parâmetros e exemplos de resposta está disponível no arquivo `docs/API.md` (ou consulte a documentação online).

## Licença

Este projeto está licenciado sob a GPL v3. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.