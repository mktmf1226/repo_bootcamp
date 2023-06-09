// 코드를 입력하세요.

const express = require('express');

const dayjs = require('dayjs');
const logger = require('../lib/logger');

const departmentRouter = require('./department');
const userRouter = require('./user');
const boardRouter = require('./board');
const postRouter = require('./post');
const commentRouter = require('./comment');
const uploadRouter = require('./upload');
const weatherRouter = require('./weather');

const router = express.Router();

router.use('/departments', departmentRouter);
router.use('/users', userRouter);
router.use('/boards', boardRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/uploads', uploadRouter);
router.use('/weathers', weatherRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/logs', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.info('This message is 조승민');
  logger.info('This message is 조승민2');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log insert!');
});
router.get('/today', (req, res, next) => {
  const today = new Date();
  logger.info(today);

  res.send(today);
});
// 현재 날짜('2023-05-22') 표시
router.get('/date', (req, res, next) => {
  const now = new Date();
  const dayjsNow = dayjs();
  logger.info(dayjsNow.format('YYYY-MM-DD'));
  const result = `/date : 
  ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  logger.info(result);
  res.send(result);
});
// 현재 날짜+시간('2023-05-22 11:31:01') 표시
router.get('/datetime', (req, res, next) => {
  const now = new Date();
  const result = `/date : 
  ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}
   ${now.getHours()}-${now.getMinutes() + 1}-${now.getSeconds()}`;
  logger.info(result);
  res.send(result);
});
// 숫자 더하기 api
// 호출방법 http://localhost:3000/plus?numA=1023&numB=100
router.get('/plus', (req, res, next) => {
  const params = {
    numA: Number(req.query.numA),
    numB: Number(req.query.numB),
  };
  const result = params.numA + params.numB;
  logger.info(JSON.stringify({ numA: params.numA, numB: params.numB, result }));
  res.send(result.toString());
});
module.exports = router;
