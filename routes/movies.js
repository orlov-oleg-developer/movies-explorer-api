const router = require('express').Router();

const {
  cardInfoValidator, movieIdValidator,
} = require('../utils/requests-validators');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post(
  '/',
  cardInfoValidator,
  createMovie,
);
router.delete(
  '/:movieId',
  movieIdValidator,
  deleteMovie,
);

module.exports = router;
