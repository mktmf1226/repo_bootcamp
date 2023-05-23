//express 모듈 선언
const express = require("express");
//path 내장 모듈 선언
const path = require("path");

//포트번호 설정
const app = express();
app.set("port", process.env.PORT || 3000);

//parser 설정
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mysql 불러오기
var mysql = require('mysql2');

//db연결
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "earthquake_db"
});


app.get(
    "/",
    (req, res, next) => {
      //console.log("GET / 요청 실행");
      next();
    },
    (req, res) => {
      try {
        res.sendFile(path.join(__dirname, "./views/index.html"));

      } catch (error) {
        console.log(error);
      }
    }
  );

//  post 요청이 들어오면
app.post("/go", (req, res, next) => {
  //console.log("POST /go 요청 실행");

  // textInput 파싱
  let {textInput} = req.body;
  textInput = textInput.trim().toUpperCase();
  // console.log(textInput);

  //쿼리문 작성
  con.connect(function(err) {
    if (err) throw err;
    //console.log("Connected!");
    let sql = "";

    // 요청 실행
    if(textInput === 'I'){
      //console.log('I');
      sql += " insert into earthquake ";
      sql += " (scale, depth, max_seis_intens, latitude, longitude, location) ";
      sql += " values ('3.1', '6', '4', '36.32', '127.75', '충북 옥천군 동쪽 16km 지역'); ";
    }else if(textInput === 'U'){
      //console.log('U');
      sql += " update earthquake ";
      sql += " set occurrence_time = now() ";
      sql += " where quake_id=38; ";
    }else if(textInput === 'D'){
      //console.log('D');
      sql += " delete from earthquake where depth=6 order by quake_id desc limit 1; ";
    }else if(textInput === 'S'){
      //console.log('S');
      sql += " select * from earthquake where scale=3.1;";
    }else{
      console.log('다른 값 들어옴');
    }
    
    con.query(sql, function (err, result) {
      try {
        if (err) throw err;
        console.log("CRUD successful !!");
        console.log(result);
      } catch (error) {
        console.log('query처리에서 에러 발생',error);
      }//try catch end    
    })
  });// connect() end
  res.redirect("/");
});

// [express] 500 error 라우트 설정
app.use((err, req, res, next) => {
  console.error(err); //에러를 콘솔에 출력하고
  res.status(500).send(err.message); //500 상태 코드와 에러메세지를 응답
});

// [express] 404 error 라우트 설정
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), () => {
  //서버를 실행한다. 메서드를 통해 포트 번호를 가져오고 해당 포트에서 대기한다.
  console.log(app.get("port"), "번 포트에서 대기 중");
});