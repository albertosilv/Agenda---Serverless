# Agenda - Serverless

Este projeto é uma aplicação serverless para gerenciamento de agenda e eventos. Foi desenvolvida utilizando o **Serverless Framework e AWS Lambda** e permite a execução local através do plugin `serverless-offline`, sem necessidade de credenciais AWS.

## Funcionalidades

- API RESTful para gerenciamento de eventos e compromissos.
- Arquitetura serverless utilizando **AWS Lambda** e **API Gateway**.
- Execução local usando `serverless-offline`.
- Testes unitários integrados com Jest.

## Tecnologias Utilizadas

- **Node.js**
- **Typescript**
- **Serverless Framework**
- **AWS Lambda**
- **Jest** para testes unitários

## Como Começar

### Pré-requisitos

- Node.js (>= 14.x)
- Serverless Framework

### Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/albertosilv/Agenda---Serverless.git
   cd Agenda---Serverless
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

### Execução Local

Para rodar o projeto localmente com o `serverless-offline`:

```bash
serverless offline
```

Isso iniciará o ambiente local, permitindo testar a API através do `localhost`.

### Endpoints Disponíveis

- **GET /agendamento**: Lista todos os eventos da agenda.
- **POST /agendas**: Cria um novo evento.

### Testes

Para rodar os testes utilizando o Jest:

```bash
npm run test
```

Jest está configurado para rodar os testes unitários das funções Lambda.

## Estrutura de Pastas

- **/src**: Código-fonte das funções Lambda.
- **/controller**: Lógica de negócio para gerenciar a agenda.
- **/service**: Serviços para interação com banco de dados.
- **/dto**: Objetos de Transferência de Dados (DTOs) para validação.
- **/interface**: Interfaces e tipos usados na aplicação.
- **/mocks**: Dados simulados para testes.
- **/test**: Testes unitários com Jest.
- **serverless.yml**: Arquivo de configuração do Serverless Framework.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. Antes de submeter, por favor, execute os testes e siga as diretrizes de contribuição.
