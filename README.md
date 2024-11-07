<p align="center">
  <h1>🎬 MoraesFlix ⭐</h1>
</p>

## Description

O MoraesFlix é uma aplicação de gerenciamento de filmes, permitindo que os usuários adicionem, editem e excluam seus filmes favoritos, além de deixarem avaliações. O projeto foi desenvolvido com tecnologias modernas:

## Tecnologias usadas:
- **Front-end**: React e Tailwind CSS  
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />

- **Back-end**: Node.js  
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />

- **Framework**: Express  
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />

- **Banco de Dados**: Prisma e PostgreSQL  
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />

- **Validações**: Zod e React Hook Form  
  <img src="https://img.shields.io/badge/Zod-2F8F4F?style=flat-square&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=react-hook-form&logoColor=white" alt="React Hook Form" />

- **Requisições HTTP**: Axios  
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" alt="Axios" />

- **Containerização**: Docker  
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />

Com uma interface amigável, o MoraesFlix facilita a gestão de suas coleções de filmes e avaliações.

## Installation

```bash
$ npm install
```

## Create .env file and paste paste inside it

```bash
$ VITE_BACKEND_URL=http://localhost:3333
```

## Running the app

```bash
$ npm run build
```

```bash
$ npm run preview
```
## Features

### Autenticação JWT

- [x] O sistema deve ser capaz de cadastrar usuários usando nome, e-mail e senha;
- [x] O sistema deve ser capaz de autenticar usuários usando e-mail e senha;

### Filmes

- [x] O sistema deve permitir adicionar novos filmes à biblioteca;
- [x] O sistema deve permitir listar todos os filmes da biblioteca;
- [x] O sistema deve permitir exibir detalhes de um filme específico;
- [x] O sistema deve permitir atualizar as informações de um filme;
- [x] O sistema deve permitir remover filmes da biblioteca;
- [x] O sistema deve gerar recomendações de filmes com base nas avaliações de filmes feitas por outros usuários;
- [x] O sistema deve permitir pesquisar por filmes específicos;
- [x] O sistema deve permitir filtrar filmes por gênero, ano e duração.

### Avaliações

- [x] O sistema deve permitir que usuários avaliem filmes de 1 a 5 estrelas;
- [x] O sistema deve permitir listar todos as avaliações dos filmes;
- [x] O sistema deve permitir atualizar as avaliações;
- [x] O sistema deve permitir remover as avaliações;
- [x] O sistema deve permitir exibir a média das avaliações de um filme.
