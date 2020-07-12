const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: mongoose.Schema.Types.String,
    validate: {
      validator(imgUrl) {
        const regex = new RegExp(
          // eslint-disable-next-line no-useless-escape
          '^(https?:\/{2})?(([a-z0-9_-]{0,63})(([a-z0-9-]{1,128}\.)+([a-z]{2,11})))(\/(([0-9a-zA-Zа-яЁА-ЯЁ_.#%&?=-]+))*[.](jpg|jpeg|gif|png))$',
        );
        return regex.test(imgUrl);
      },
    },
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    validate: (email) => validator.isEmail(email),
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
