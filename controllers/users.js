const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { JWT_SECRET } = require('../config/server-config');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const NoAuthError = require('../errors/no-auth-error');
const ConflictError = require('../errors/conflict-error');

const statusCode = {
  success: 200,
  created: 201,
};

const option = {
  new: true,
  runValidators: true,
};

const checkUser = (user) => {
  if (user === null) {
    throw new NotFoundError('Нет пользователя с таким id');
  }
};

const createUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, name, password: hash,
    });

    user.password = undefined;

    return res
      .status(statusCode.created)
      .send({ user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError());
    }

    if (e.code === 11000) {
      return next(new ConflictError('Переданы некорректные данные при создании пользователя'));
    }
    return next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new NoAuthError('Неправильные почта или пароль');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new NoAuthError('Неправильные почта или пароль');
    }

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return res.status(statusCode.success).send({ token });
  } catch (e) {
    return next(e);
  }
};

const getUser = async (req, res, next) => {
  const { userId = req.user._id } = req.params;

  try {
    const user = await User.findById(userId);

    checkUser(user);

    return res.status(statusCode.success).send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

const updateUser = async (userId, info, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(userId, info, option);

    checkUser(user);

    return res.status(statusCode.success).send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

const updateUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  await updateUser(userId, { name, email }, res, next);
};

module.exports = {
  createUser,
  login,
  getUser,
  updateUserInfo,
};
