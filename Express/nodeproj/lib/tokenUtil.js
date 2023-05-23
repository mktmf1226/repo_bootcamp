const jwt = require('jsonwebtoken');

const secretKey = '763979244226452948404D635166546A576E5A7234753778217A25432A462D4A';
const options = {
  expiresIn: '1h', // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userid: user.userid,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
