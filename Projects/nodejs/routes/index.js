const express = require('express');

const router = express.Router();

// GET 
router.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    res.send("Hello World!");
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.') //에러가 발생시키면
});


module.exports = router;