const jwt = require('jsonwebtoken');
const Yup = require('yup');

const User = require('../models/User');
const authConfig = require('../configs/auth');

const AppError = require('../errors/AppError');

class UserController {
  async store(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      name: Yup.string()
        .required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required(),
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao cadastrar o usuário',err.errors);
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('Erro ao cadastrar o usuário','Usuário já existente com esse e-mail.');
    }

    try {
      const user = await User.create({name, email, password});

      return res.json({
        status: "success",
        user: {
          id: user.id,
          name,
          email,
        }
      });
    } catch (err) {
      throw new AppError('Erro ao cadastrar o usuário',err);
    } 
  }

  async show(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required()
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao procurar o usuário',err.errors);
    }

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Erro ao procurar o usuário','Usuário não cadastrado.');
    }

    return res.json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        email,
      }
    });
  }

  async sigIn(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required(),
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao efetuar o login',err.errors);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Erro ao efetuar o login','Usuário não foi encontrado com esse email.');
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError('Erro ao efetuar o login','Senha incorreta.');
    }

    try {
      const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: authConfig.expiredsIn });
      return res.json({
        status: "success",
        user: {
          id: user.id,
          name: user.name,
          email,
        },
        token
      });
    } catch (err) {
      throw new AppError('Erro ao efetuar o login',err);
    } 
  }

  // rota para deletar usuário (útil para os testes)
  async delete(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required()
    });

    // Validação de campos com o Yup.
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError('Erro ao deletar o usuário',err.errors);
    }

    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Erro ao procurar o usuário','Usuário não cadastrado.');
    }

    try {
      await user.destroy();

      return res.json({
        status: "success",
        user: {
          id: user.id,
          name: user.name,
          email,
        }
      });
    } catch(err) {
      throw new AppError('Erro ao deletar o usuário',err);
    }
  }
}

module.exports = new UserController();