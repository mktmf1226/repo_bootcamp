// mysql 불러오기
var mysql = require('mysql2');

//db연결
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "earthquake_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  //var sql = "DROP TABLE customers";
//   var sql = "create table earthquake(quake_id int primary key,occurrence_time datetime,scale decimal(18,10),depth decimal(18,10),max_seis_intens tinyint, latitude decimal(18,10), longitude decimal(18,10), location char(100))";
//   var sql = "DROP TABLE earthquake";

//   var sql = "insert into earthquake";
//   sql += "(quake_id, occurrence_time, scale, depth, max_seis_intens, latitude, longitude, location)";
//   sql += "values (38,'2023/04/30 19:03:29', '3.1', '6', '4', '36.32', '127.75', '충북 옥천군 동쪽 16km 지역');";

  var sql = "delete from earthquake where quake_id=38";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});