# Financas-Server

<p align="center">
  <img alt="transactioned" src=".github/logo.png" width="12.5%">
</p>

<h2 align="center">
  This is the server for a finance tracker app that was develop using NodeJS, Express, TypeORM e PostgreSQL.
</h2>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/areasflavio/financas-server.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/areasflavio/financas-server.svg">

  <a href="https://github.com/areasflavio/financas-server/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/areasflavio/financas-server.svg">
  </a>
</p>

<p align="center">
  <a href="#star-features">Features</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer-API-Reference">API Reference</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#keyboard-technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer_mouse-installation">Installation</a>
</p>

# :star: Features

[(Back to top)](#Financas-Server)

This is a server API for a finance tracking application. It's quite simple, you
can start tracking your finances right away.

Some key features are:

- Upload CSV files.
- Manual entry for values.
- Service that resume the income, outcome and the final balance.
- Codebase is cover by tests with Jest and supertest.

The application is built using Node.JS with Express framework. The database is
the PostgreSQL connected by TypeORM. The entire codebase is written using Typescript.

<!--
<p align="center">
  Checkout the <a href=">API Live version</a>
   hosted on:
</p>
<p align="center">
    <img alt="Heroku" src="https://img.shields.io/badge/heroku-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/>
</p>

<p align="center">
  You also can check the complete <a href="">Application Live version</a>
  hosted on:
</p>
<p align="center">
    <img alt="Vercel" src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>
-->

<br/>

# :computer: API-Reference

[(Back to top)](#Financas-Server)

## Categories

### Get all categories

```http
  GET /categories
```

<br/>

## Transactions

### Create a transaction

```http
  POST /transactions
```

| Body       | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `title`    | `string` | **Required**. Title of the transaction    |
| `value`    | `string` | **Required**. Value of the transaction    |
| `type`     | `string` | **Required**. Type of the transaction     |
| `category` | `string` | **Required**. Category of the transaction |

### Upload a CSV file for create a transactions list

```http
  POST /import
```

| Body   | Type  | Description                                  |
| :----- | :---- | :------------------------------------------- |
| `file` | `csv` | **Required**. CSV file with the transactions |

### Get all the transactions

```http
  GET /transactions
```

### Delete a existing transaction

```http
  DELETE /transactions/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of the transaction |

<br/>

# :keyboard: Technologies

[(Back to top)](#Financas-Server)

This is what i used and learned with this project:

- [x] Node.JS
- [x] Express
- [x] TypeORM
- [x] PostgreSQL
- [x] UUID
- [x] CSV Parse
- [x] Multer
- [x] Eslint
- [x] Prettier
- [x] Express Async Errors
- [x] Jest
- [x] Supertest
- [x] Typescript

<br/>

# :computer_mouse: Installation

[(Back to top)](#Financas-Server)

To use this project, first you need NodeJS and PostgreSQL running in your device,
the mail service is optional, then you can follow the commands below:

```bash
# Clone this repository
git clone https://github.com/areasflavio/financas-server.git

# Go into the repository
cd financas-server

# Install dependencies for the backend
yarn install

# Use ormconfig.json file to inject your database config

# Make sure that you have a proper database created

# Run the migrations
yarn typeorm migration:run

# To start the express development server, run the following command
yarn dev:server
```

# :man_technologist: Author

[(Back to top)](#Financas-Server)

Build by Flávio Arêas 👋 [Get in touch!](https://www.linkedin.com/in/areasflavio/)
