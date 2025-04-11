const { verifyToken } = require('../utils/jwt');
const { user } = require('../models');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  const decoded = verifyToken(token);

  if (decoded == null) {
    return res.sendStatus(403);
  }

  try {
    const userdata = await user.findByPk(decoded.id);
    if (!userdata) {
      return res.sendStatus(401);
    }
    req.user = userdata;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.sendStatus(500);
  }
};

module.exports = {authenticateToken};