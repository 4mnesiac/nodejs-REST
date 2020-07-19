const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: mongoose.Schema.Types.String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url, {
        allow_underscores: true, allow_trailing_dot: true, allow_protocol_relative_urls: true,
      }),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
cardSchema.statics.compareCardOwner = function (cardId, userId) {
  return this.findById(cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(new Error('Карточка не найдена'));
      }
      if (card.owner._id !== userId) {
        return Promise.reject(new Error('Недостаточно прав'));
      }
      return card;
    });
};

module.exports = mongoose.model('card', cardSchema);
