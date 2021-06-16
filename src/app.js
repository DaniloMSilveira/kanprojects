require('dotenv').config();
const express = require("express");
require("express-async-errors");
const routes = require("./routes");
require("reflect-metadata");
const path = require('path');


// Modelos de retorno para erros
const AppError = require("./errors/AppError");

const app = express();

// Setando ejs na view engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, '..', 'public')))

// Configurando retornos de erros
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      error: err.error,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      error: 'Internal server error',
      message: `Internal server error ${err.message}`
    });
  }
});

// Database
const db = require('./database');
db.connect();

module.exports = app;
