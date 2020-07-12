const router = require('express').Router();
const path = require('path');
const auth = require('../middlewares/auth');

const {
  getUserById,
  getUsers,
  updateProfile,
  updateAvatar,
  login,
  createUser,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.join('..', 'controllers', 'users'));

router.get('/users', auth, getUsers);
router.get('/users/:_id', auth, getUserById);
router.post('/signin', login);
router.post('/signup', createUser);
router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;
