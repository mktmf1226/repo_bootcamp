const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');
const tokenUtil = require('../lib/tokenUtil');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      departmentId: req.body.departmentId,
      name: req.body.name,
      userid: req.body.userid,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name || !params.userid || !params.password) {
      const err = new Error('Not allowed null (name, userid, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      name: req.query.name,
      userid: req.query.userid,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 상세조회, 수정, 삭제 (실습으로 구현할 것)

// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id, // 상세정보는 params로 세팅한다.
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await userService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id, // 검색조건은 params을 사용한다.
      departmentId: req.body.departmentId,
      name: req.body.name, // 수정할 내용은 body로 받는다.
      role: req.body.role,
      eamil: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.update.params) ${JSON.stringify(params)}`);

    const result = await userService.edit(params);
    logger.info(`(user.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

    const result = await userService.delete(params);
    logger.info(`(user.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 로그인 : user 토큰 발행
router.post('/token', async (req, res) => {
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };
    logger.info(`(auth.token.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.userid || !params.password) {
      const err = new Error('Not allowed null (userid, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.login(params);
    logger.info(`(auth.token.result) ${JSON.stringify(result)}`);

    // 토큰 생성
    const token = tokenUtil.makeToken(result);

    // res객체에 header에 세팅
    res.set('token', token);

    // 최종 응답
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
