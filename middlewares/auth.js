const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, JWT_DEV_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new Error('Вы не авторизованы');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET);
  } catch (err) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
