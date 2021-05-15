const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // Nativo do Node, para permitir usar async await em uma funcao de callback.

const authConfig = require('../configs/auth');

module.exports = async (req, res, next) => {
  const token = req.query.token;

  if (token) {
    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);
  
      // Incluind o Id do usuario autenticado na requisicao que chamou o Middleawe de autenticação.
      req.userId = decoded.id;
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return res.redirect('/');
  }
};