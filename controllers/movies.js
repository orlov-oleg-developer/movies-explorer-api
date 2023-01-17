const mongoose = require('mongoose');

const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const statusCode = {
  success: 200,
  created: 201,
};

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).populate(['owner']);
    return res.status(statusCode.success).json(movies);
  } catch (e) {
    return next(e);
  }
};

const createMovie = async (req, res, next) => {
  const ownerId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: ownerId,
      movieId,
      nameRU,
      nameEN,
    });
    return res.status(statusCode.created).json(movie);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильм с указанным _id не найден');
    }

    const movieOwnerId = String(movie.owner);

    if (userId !== movieOwnerId) {
      throw new ForbiddenError('У вас нет доступа к удалению этой карточки');
    }

    await movie.remove();

    return res.status(statusCode.success).json(movie);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
