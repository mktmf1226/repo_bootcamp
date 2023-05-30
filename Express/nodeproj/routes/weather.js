const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const { isLoggedIn } = require('../lib/middleware');
const weatherUtil = require('../lib/weatherUtil');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      numOfRow: req.body.numOfRow,
      pageNo: req.body.pageNo,
      dataType: req.body.dataType,
      base_date: req.body.base_date,
      base_time: req.body.base_time,
      // nx: req.body.nx,
      // ny: req.body.ny,
      lat: req.body.lat, // 위도
      lng: req.body.lng, // 경도
    };
    logger.info(`(weather.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    // if (!params.name) {
    //   const err = new Error('Not allowed null (name)');
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await weatherUtil.getData(params);
    logger.info(`(weather.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
