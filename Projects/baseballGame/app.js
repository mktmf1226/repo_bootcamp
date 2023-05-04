//express 모듈 선언
const express = require('express');
//path 내장 모듈 선언
const path = require('path');
//crypto 모듈 선언
const crypto = require('crypto');
//fs
const fs = require('fs');

//포트번호 설정
const app = express();
app.set('port', process.env.PORT || 3000);

//parser 설정
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// //라우터 선언
// const indexRouter = require('./routes');
// const uploadRouter = require('./routes/upload');

// //라우터 설정
// app.use('/', indexRouter);
// app.use('/upload', uploadRouter);


// get 요청이 들어오면
app.get(
  '/',
  (req, res, next) => {
    console.log('GET / 요청 실행');
    next();
  },
  (req, res) => {
    try {
      res.sendFile(path.join(__dirname, './views/index.html'));
    } catch (error) {
      console.log(error);
    }
  }
);

// post 요청이 들어오면
app.post(
  '/gogame',
  (req, res, next) => {
    console.log('POST /gogame 요청 실행');
  }
);

// [express] 500 error 라우트 설정
app.use((err, req, res, next) => {
  console.error(err); //에러를 콘솔에 출력하고
  res.status(500).send(err.message); //500 상태 코드와 에러메세지를 응답
});

// [express] 404 error 라우트 설정
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.listen(app.get('port'), () => {
  //서버를 실행한다. 메서드를 통해 포트 번호를 가져오고 해당 포트에서 대기한다.
  console.log(app.get('port'), '번 포트에서 대기 중');
});
