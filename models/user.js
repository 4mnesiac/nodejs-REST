const mongoose = require('mongoose');

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
});
module.exports = mongoose.model('user', userSchema);
