const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const User = require(path.join('..', 'models', 'user'));
const NotFoundError = new Error();

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        NotFoundError.message = 'Пользователя с указанным id не существует';
        NotFoundError.name = 'NotFoundError';
        throw NotFoundError;
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else if (err.name === 'NotFoundError') {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(404).send({
      message: err.message,
    }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({
      message: `Пользователь ${name} успешно создан`,
      data: user,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name: req.body.name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(200).send({
        message: 'Имя обновлено',
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(200).send({
        message: 'Аватар обновлен',
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
