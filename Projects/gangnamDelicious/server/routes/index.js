const express = require('express');
const router = express.Router();

// mysql 불러오기
const mysql = require('mysql2');

//db연결
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "gangnam_db"
});

router.get('/', (req, res) => {
  // res.json({
  //   'message': 'This is a test',
  // });
  try {
    //db 커넥트
    con.connect(function (err) {
      if (err) throw err;
      //console.log("Connected!");

      let sql = "select * from delist";

      con.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("sql inserted");
        res.json(result);
      });
    });

  } catch (error) {
    console.log(error);
    res.json({'message': 'error selecting sql'});
  }
});

module.exports = router;