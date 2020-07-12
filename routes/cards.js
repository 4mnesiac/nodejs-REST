const router = require('express').Router();
const path = require('path');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.join('..', 'controllers', 'cards'));

router.route('/cards')
  .get(getCards)
  .post(createCard);
router.route('/cards/:cardId/likes')
  .put(likeCard)
  .delete(dislikeCard);
router.delete('/cards/:_id', deleteCard);

module.exports = router;
