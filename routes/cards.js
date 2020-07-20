const router = require('express').Router();
const path = require('path');
const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.join('..', 'controllers', 'cards'));

router.route('/cards')
  .get(auth, getCards)
  .post(auth, createCard);
router.route('/cards/:cardId/likes')
  .put(auth, likeCard)
  .delete(auth, dislikeCard);
router.delete('/cards/:_id', auth, deleteCard);

module.exports = router;
