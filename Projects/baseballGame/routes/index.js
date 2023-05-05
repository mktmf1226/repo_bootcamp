const express = require("express");
//path 내장 모듈 선언
const path = require("path");

const router = express.Router();

// GET
router.get(
  "/",
  (req, res, next) => {
    console.log("GET / 요청에서만 실행됩니다.");
    next();
  },
  (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../views/index.html"));
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
