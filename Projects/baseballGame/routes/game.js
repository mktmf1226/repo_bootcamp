const express = require('express');
//path 내장 모듈 선언
const path = require("path");
const router = express.Router();

// GET /gogame 라우터
router.get('/', (req, res, next) => {
  //console.log('gogame router 실행');
  next();
  },
  (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../views/game.html"));

    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;