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

router.post('/', (req, res) => {
  try {
    const data = req.body;

    //db 커넥트
    con.connect(function (err) {
      if (err) throw err;
      //console.log("Connected!");

      let sql = " INSERT INTO delist(userID, foodName, spaceName, price, stars) ";
      sql += ` VALUES ("${data.userID}", "${data.foodName}", "${data.spaceName}", ${data.price}, ${data.stars}) `;

      con.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("sql inserted");
        res.json(result);
      });
    });

  } catch (error) {
    console.log(error);
    // res.json({'message': 'error inserting sql'});
  }
});

module.exports = router;