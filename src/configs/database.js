require('dotenv').config();
var host = process.env.NODE_ENV === 'prod' ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV;
var username = process.env.NODE_ENV === 'prod' ? process.env.DB_USERNAME_PROD : process.env.DB_USERNAME_DEV;
var password = process.env.NODE_ENV === 'prod' ? process.env.DB_PASSWORD_PROD : process.env.DB_PASSWORD_DEV;
var database = process.env.NODE_ENV === 'prod' ? process.env.DB_DB_PROD : process.env.DB_DB_DEV;

module.exports = {
  dialect: 'postgres',
  host: host,
  username: username,
  password: password,
  database: database,
  port: 5432,
  // SSL habilitado devido ao banco cloud da Heroku
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};