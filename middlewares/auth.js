const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, JWT_DEV_SECRET = 'save-dev-and-enter' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET);
    req.user = payload;

    next();
  } catch (err) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
};
