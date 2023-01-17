const router = require('express').Router();

const {
  userNameEmailValidator,
} = require('../utils/requests-validators');

const {
  getUser, updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch(
  '/me',
  userNameEmailValidator,
  updateUserInfo,
);

module.exports = router;
