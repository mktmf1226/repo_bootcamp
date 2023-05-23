const { Op } = require('sequelize');
const { Department } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Department.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.id) {
      setQuery.where = {
        ...setQuery.where,
        id: params.id, // '=' 검색
        // id: { [Op.in]: params.id }, // in검색 id 값이 Array인 in 검색
        // id: { [Op.gt]: params.id }, // '>' 검색
        // id: { [Op.lt]: params.id }, // '<' 검색
        // id: { [Op.lte]: params.id }, // '<=' 검색
      };
    }
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      // Department.findAll
      Department.findAndCountAll({
        ...setQuery,
        // attributes: ['id', 'name', 'code'], // 필요한 값만 가져오는 조건
        attributes: { exclude: ['description'] }, // 필요 없는 값만 제외하는 조건
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Department.findByPk(
        params.id,
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Department.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Department.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
