const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Simpan di environment variable untuk produksi
const expiresIn = '1h'; // Contoh masa berlaku token

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };