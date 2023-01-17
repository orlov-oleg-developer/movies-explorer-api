const router = require('express').Router();

const {
  emailPasswordValidator,
  userDataValidator,
} = require('../utils/requests-validators');

const {
  login,
  createUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.post(
  '/signin',
  emailPasswordValidator,
  login,
);
router.post(
  '/signup',
  userDataValidator,
  createUser,
);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найена'));
});

module.exports = router;
