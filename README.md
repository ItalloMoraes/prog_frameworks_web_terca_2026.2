# API de Alunos

API REST desenvolvida em **Node.js**, **Express**, **Prisma ORM** e
**MySQL** para gerenciar alunos. O projeto faz parte da atividade de
Programação para Frameworks Web.

## Funcionalidades

-   Listar alunos com paginação.
-   Ordenar a listagem por campo e direção (`asc` ou `desc`).
-   Informar a quantidade total de alunos cadastrados.
-   Buscar um aluno pelo ID.
-   Cadastrar um aluno.
-   Atualizar nome e e-mail de um aluno.
-   Excluir um aluno.
-   Tratar situações como aluno não encontrado, dados obrigatórios
    ausentes e e-mail duplicado.

## Tecnologias utilizadas

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [Prisma ORM](https://www.prisma.io/)
-   [MySQL](https://www.mysql.com/)

## Requisitos

Antes de executar o projeto, tenha instalado:

-   Node.js e npm.
-   MySQL em execução.
-   Um banco de dados MySQL chamado `univ` (ou outro nome configurado no
    arquivo `.env`).

## Configuração

### 1. Instale as dependências

Na pasta do projeto, execute:

``` bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure a conexão com o
MySQL. Exemplo:

``` env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/univ"
PORT=3000
```

Substitua `USUARIO` e `SENHA` pelos dados do seu MySQL. Não compartilhe
sua senha nem envie o arquivo `.env` para o GitHub.

### 3. Prepare o banco de dados

Confira se o modelo do Prisma está configurado para o banco utilizado.
Para sincronizar o modelo com o banco, execute:

``` bash
npx prisma db push
```

Se o projeto exigir a geração do Prisma Client no ambiente instalado,
execute também:

``` bash
npx prisma generate
```

## Executar a API

Inicie o servidor em modo de desenvolvimento:

``` bash
npm run dev
```

Com a configuração padrão, a API ficará disponível em:

``` text
http://localhost:3000
```

## Rotas disponíveis

Considere a URL base `http://localhost:3000/alunos`.

  ------------------------------------------------------------------------
  Método            Rota              Descrição         Resposta esperada
  ----------------- ----------------- ----------------- ------------------
  GET               `/alunos`         Lista alunos e    `200 OK`
                                      informa o total   

  GET               `/alunos/:id`     Busca um aluno    `200 OK` ou
                                      pelo ID           `404 Not Found`

  POST              `/alunos`         Cadastra um aluno `201 Created`

  PUT               `/alunos/:id`     Atualiza nome e   `200 OK`,
                                      e-mail            `404 Not Found` ou
                                                        erro de validação

  DELETE            `/alunos/:id`     Exclui um aluno   `204 No Content`
                                                        ou `404 Not Found`
  ------------------------------------------------------------------------

### Listar alunos

Requisição:

``` http
GET /alunos
```

A listagem aceita os parâmetros opcionais `page`, `pageSize`, `orderBy`
e `order`.

Exemplo:

``` http
GET /alunos?page=1&pageSize=10&orderBy=nome&order=asc
```

-   `page`: página desejada.
-   `pageSize`: quantidade de registros por página.
-   `orderBy`: campo usado na ordenação. Campos previstos: `id`, `nome`,
    `email`, `createdAt` e `updatedAt`.
-   `order`: direção da ordenação (`asc` ou `desc`).

Exemplo de resposta:

``` json
{
  "alunos": [
    {
      "id": 1,
      "nome": "Ana",
      "email": "ana@email.com"
    }
  ],
  "total": 1
}
```

O exemplo é ilustrativo; os registros e os campos retornados dependem
dos dados existentes no banco.

### Buscar aluno por ID

``` http
GET /alunos/1
```

Quando o aluno existe, a API retorna o objeto do aluno. Caso não exista,
retorna `404 Not Found` com uma mensagem de erro.

### Cadastrar aluno

``` http
POST /alunos
Content-Type: application/json
```

Corpo da requisição:

``` json
{
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

### Atualizar aluno

``` http
PUT /alunos/1
Content-Type: application/json
```

Corpo da requisição:

``` json
{
  "nome": "Maria Souza",
  "email": "maria.souza@email.com"
}
```

O nome e o e-mail devem ser informados. O e-mail também precisa ser
único.

### Excluir aluno

``` http
DELETE /alunos/1
```

Quando a exclusão é concluída, a API retorna `204 No Content`, sem corpo
de resposta.

## Organização do projeto

``` text
src/
├── controllers/    # Recebe as requisições e monta as respostas HTTP
├── databases/      # Configuração de acesso ao banco/Prisma
├── errors/         # Classes de erro da aplicação
├── middlewares/    # Middlewares de validação
├── routes/         # Definição das rotas
├── schemas/        # Esquemas de validação
├── services/       # Regras de negócio e operações com o Prisma
└── index.js        # Inicialização da aplicação
```

## Tratamento de erros

A API utiliza erros específicos para representar situações esperadas,
por exemplo:

-   **400 Bad Request:** dados obrigatórios ausentes ou parâmetros de
    ordenação inválidos.
-   **404 Not Found:** aluno não encontrado.
-   **409 Conflict:** tentativa de cadastrar ou atualizar um aluno com
    e-mail já utilizado.
-   **500 Internal Server Error:** erro inesperado no servidor.

## Observações

-   Os exemplos de requisição podem ser executados pelo Postman,
    Insomnia ou outra ferramenta para testar APIs.
-   Os dados apresentados nos exemplos são fictícios.
-   Mantenha credenciais e informações privadas fora do repositório.
