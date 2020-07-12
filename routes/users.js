const router = require('express').Router();
const path = require('path');

const {
  getUserById,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.join('..', 'controllers', 'users'));

router.route('/users')
  .get(getUsers)
  .post(createUser);
router.get('/users/:_id', getUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
