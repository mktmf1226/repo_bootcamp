const express = require("express");
const router = express.Router();

// mysql 불러오기
const mysql = require("mysql2");

//db연결
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "gangnam_db",
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;

    //db 커넥트
    con.connect(function (err) {
      if (err) throw err;
      //console.log("Connected!");

      let sql = `select * from delist where num=${id}`;

      con.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("sql inserted");
        res.json(result);
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "error selecting sql" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;

    //db 커넥트
    con.connect(function (err) {
      if (err) throw err;
      //console.log("Connected!");

      let sql = `delete from delist where num=${id}`;

      con.query(sql, function (err, result) {
        if (err) throw err;
        // console.log("sql deleted");
        res.json(result);
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "error deleting sql" });
  }
});

module.exports = router;
