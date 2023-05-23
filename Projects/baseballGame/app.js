//express 모듈 선언
const express = require("express");
// //path 내장 모듈 선언
// const path = require("path");

//포트번호 설정
const app = express();
app.set("port", process.env.PORT || 3000);

//parser 설정
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // 정적 파일을 제공할 디렉토리를 지정합니다.
// app.use(express.static('public'));

// //라우터 선언
const indexRouter = require('./routes');
const gameRouter = require('./routes/game');
const dbRouter = require('./routes/dbres');

// //라우터 설정
app.use('/', indexRouter);
app.use('/gogame', gameRouter);
app.use('/getDataInsert', dbRouter);

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
