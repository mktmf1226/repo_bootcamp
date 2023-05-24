// 코드를 입력하세요.

const { Op } = require('sequelize');
const {
  Department, Board, User, Post, Comment,
} = require('../models/index');

const dao = {
  // 등록
  insert(params) {
    return new Promise((resolve, reject) => {
      Comment.create(params).then((inserted) => {
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
    if (params.content) {
      setQuery.where = {
        ...setQuery.where,
        content: { [Op.like]: `%${params.content}%` }, // like검색
      };
    }
    if (params.userIds) {
      setQuery.where = {
        ...setQuery.where,
        userId: params.userIds, // 'in' 검색
      };
    }
    if (params.postIds) {
      setQuery.where = {
        ...setQuery.where,
        postId: params.postIds, // 'in' 검색
      };
    }
    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];

    return new Promise((resolve, reject) => {
      Comment.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            attributes: User.includeAttributes,
          },
        ],
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
      Comment.findByPk(
        params.id,
        {
          include: [
            {
              model: Post,
              as: 'Post',
              attributes: Post.includeAttributes,
              include: [{
                model: Board,
                as: 'Board',
                attributes: Board.includeAttributes,
              }],
            },
            {
              model: User,
              as: 'User',
              attributes: User.includeAttributes,
              include: [{
                model: Department,
                as: 'Department',
                attributes: Department.includeAttributes,
              }],
            },
          ],
        },
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
      Comment.update(
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
      Comment.destroy({
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
