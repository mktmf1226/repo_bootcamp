const express = require("express");
// const path = require("path");
const router = express.Router();

// mysql 모듈 선언
var mysql = require("mysql2");

//db연결
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "baseballgame",
});

// POST /getDataInsert 라우터
router.post(
  "/",
  (req, res, next) => {
    //console.log("dbres router 실행");
    next();
  },
  (req, res) => {
    try {
      // game.html에서 요청한 data = {"trycount":trycount} 를 받아온다
      const data = req.body;
      //console.log(data.trycount);

      //db 커넥트
      con.connect(function (err) {
        if (err) throw err;
        //console.log("Connected!");

        let sql = "insert into board(user, trycount)";
        sql += `values ('testnodescript', ${data.trycount})`;

        con.query(sql, function (err, result) {
          if (err) throw err;
          //console.log("sql inserted");
          res.json(result);
        });
      });

    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
