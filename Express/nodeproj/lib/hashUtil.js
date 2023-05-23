const crypto = require('crypto');

const iterations = process.env.iteration || 1005; // 몇 번 암호화를 반복할 것인지

const hashUtil = {
  // hash함수 생성
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      if (!password) { // 패스워드가 없으면
        reject(new Error('Not allowed null (password)')); // reject 함수로 promise를 거부한다.
      }

      // 1. salt 생성 (랜덤값 설정)
      const salt = crypto.randomBytes(64).toString('base64');

      // 2. hash 생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const hash = derivedKey.toString('hex');

        // 최종 패스워드 (password=salt.hash)
        const encryptedPassword = `${salt}.${hash}`;

        resolve(encryptedPassword);
      });
    });
  },
  // 비밀번호 확인
  checkPasswordHash(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      if (!password || !encryptedPassword) { // 입력 값이나 암호화된 값이 없을 때
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt와 hash 분리
      const encryptedPasswordSplit = encryptedPassword.split('.');
      const salt = encryptedPasswordSplit[0];
      const encryptedHash = encryptedPasswordSplit[1];

      // 2. 입력된 password로부터 hash생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const hash = derivedKey.toString('hex');

        // 생성된 hash 값(입력한 password를 암호화함)과 암호화되어 저장된 encryptedHash를 비교한다.
        if (hash === encryptedHash) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
};

module.exports = hashUtil;
