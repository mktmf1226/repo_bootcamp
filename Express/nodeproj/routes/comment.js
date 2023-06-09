const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const commentService = require('../service/commentService');
const { isLoggedIn } = require('../lib/middleware');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  const loginUserId = res.get('userId') || null;
  try {
    const params = {
      postId: req.body.postId,
      content: req.body.content,
      userId: loginUserId,
    };
    logger.info(`(comment.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.postId || !params.content) {
      const err = new Error('Not allowed null (postId, content)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await commentService.reg(params);
    logger.info(`(comment.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      content: req.query.content,
      userIds: req.query.userIds ? req.query.userIds.split(',') : null,
      postIds: req.query.postIds ? req.query.postIds.split(',') : null,
    };
    logger.info(`(comment.list.params) ${JSON.stringify(params)}`);

    const result = await commentService.list(params);
    logger.info(`(comment.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 상세조회, 수정, 삭제 (실습으로 구현할 것)

// 상세정보 조회
router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id, // 상세정보는 params로 세팅한다.
    };
    logger.info(`(comment.info.params) ${JSON.stringify(params)}`);

    const result = await commentService.info(params);
    logger.info(`(comment.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id, // 검색조건은 params을 사용한다.
      content: req.body.content,
    };
    logger.info(`(comment.update.params) ${JSON.stringify(params)}`);

    const result = await commentService.edit(params);
    logger.info(`(comment.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(comment.delete.params) ${JSON.stringify(params)}`);

    const result = await commentService.delete(params);
    logger.info(`(comment.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
